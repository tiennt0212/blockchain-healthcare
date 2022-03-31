from venv import create
from sawtooth_signing import create_context
from sawtooth_signing import CryptoFactory
from sawtooth_signing import ParseError
from sawtooth_signing.secp256k1 import Secp256k1PrivateKey

from sawtooth_sdk.protobuf.transaction_pb2 import TransactionHeader
from sawtooth_sdk.protobuf.transaction_pb2 import Transaction
from sawtooth_sdk.protobuf.batch_pb2 import BatchList
from sawtooth_sdk.protobuf.batch_pb2 import BatchHeader
from sawtooth_sdk.protobuf.batch_pb2 import Batch

from utils import prefix_address, hash

import requests


class MetaHealthClient(object):
    def __init__(self, baseUrl, key):
        self._baseUrl = baseUrl

        if key is None:
            self._signer = None
            return

        self._signer = CryptoFactory(
            create_context('secp256k1')).new_signer(key)
        self._publicKey = self._signer.get_public_key().as_hex()
        self._address = prefix_address(
        ) + hash(self._publicKey.encode('utf-8'))[0:64]

    def _send_to_validator(self, suffix, data=None, contentType=None):
        if self._baseUrl.startswith("http://"):
            url = "{}/{}".format(self._baseUrl, suffix)
        else:
            url = "http://{}/{}".format(self._baseUrl, suffix)

        headers = {}

        if contentType is not None:
            headers['Content-Type'] = contentType

        try:
            if data is not None:
                result = requests.post(url, headers=headers, data=data)
            else:
                result = request.get(url, headers=headers)
            if not result.ok:
                raise Exception("Error {}: {}".format(
                    result.status_code, result.reason))

        except requests.ConnectionError as err:
            raise Exception(
                'Failed to connect to {}: {}'.format(url, str(err)))

        except BaseException as err:
            raise Exception(err)

        return result.text

    def _wrap_and_send(self,
                       action,
                       *values):
        '''Create a transaction, then wrap it in a batch.     

           Even single transactions must be wrapped into a batch.
        '''

        # Generate a csv utf-8 encoded string as payload
        rawPayload = action

        for val in values:
            rawPayload = ",".join([rawPayload, str(val)])

        payload = rawPayload.encode()

        # Construct the address where we'll store our state
        address = self._address
        inputAddressList = [address]
        outputAddressList = [address]

        if "transfer" == action:
            toAddress = _hash(FAMILY_NAME.encode('utf-8'))[0:6] + \
                _hash(values[1].encode('utf-8'))[0:64]
            inputAddressList.append(toAddress)
            outputAddressList.append(toAddress)

        # Create a TransactionHeader
        header = TransactionHeader(
            signer_public_key=self._publicKey,
            family_name=FAMILY_NAME,
            family_version="1.0",
            inputs=inputAddressList,
            outputs=outputAddressList,
            dependencies=[],
            payload_sha512=_hash(payload),
            batcher_public_key=self._publicKey,
            nonce=random.random().hex().encode()
        ).SerializeToString()

        # Create a Transaction from the header and payload above
        transaction = Transaction(
            header=header,
            payload=payload,
            header_signature=self._signer.sign(header)
        )

        transactionList = [transaction]

        # Create a BatchHeader from transactionList above
        header = BatchHeader(
            signer_public_key=self._publicKey,
            transaction_ids=[txn.header_signature for txn in transactionList]
        ).SerializeToString()

        # Create Batch using the BatchHeader and transactionList above
        batch = Batch(
            header=header,
            transactions=transactionList,
            header_signature=self._signer.sign(header))

        # Create a Batch List from Batch above
        batch_list = BatchList(batches=[batch])

        # Send batch_list to rest-api
        return self._send_to_validator(
            "batches",
            batch_list.SerializeToString(),
            'application/octet-stream')

    
