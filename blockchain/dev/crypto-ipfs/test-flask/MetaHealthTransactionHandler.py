from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction
from sawtooth_sdk.processor.exceptions import InternalError
from sawtooth_sdk.processor.core import TransactionProcessor
from utils import hash, prefix_address
from constants import FAMILY_NAME, FAMILY_VERSION

import traceback
import sys
import logging

LOGGER = logging.getLogger(__name__)


class MetaHealthTransactionHandler(TransactionHandler):
    def __init__(self, namespace_prefix):
        self._namespace_prefix = namespace_prefix

    @property
    def family_name(self):
        return FAMILY_NAME

    @property
    def family_versions(self):
        return [FAMILY_VERSION]

    @property
    def namespaces(self):
        return [self._namespace_prefix]

    def _get_wallet_address(self, key):
        return prefix_address() + hash(key.encode('utf-8'))[0:64]

    def register(self, context, key, metadata):
        address = self._get_wallet_address(key)
        entry = context.get_state([address])
        print(entry)

    def apply(self, transaction, context):
        '''This implements the apply function for this transaction handler.

           This function does most of the work for this class by processing
           a single transaction for the simplewallet transaction family.   
        '''
        print(transaction)
        # Get the payload and extract simplewallet-specific information.
        header = transaction.header
        payload_list = transaction.payload.decode().split(",")
        operation = payload_list[0]
        amount = payload_list[1]

        # Get the public key sent from the client.
        from_key = header.signer_public_key
        if operation == "register":
            self.register(context, amount, from_key)
        else:
            return 'Wrong Transaction'

    def _make_ipfs_store(self, context, amount, from_key):
        wallet_address = self._get_wallet_address(from_key)
        LOGGER.info('Got the key {} and the wallet address {} '.format(
            from_key, wallet_address))
        current_entry = context.get_state([wallet_address])
        new_balance = 0

        if current_entry == []:
            LOGGER.info('No previous deposits, creating new deposit {} '
                        .format(from_key))
            new_balance = int(amount)
        else:
            balance = int(current_entry[0].data)
            new_balance = int(amount) + int(balance)

        state_data = str(new_balance).encode('utf-8')
        addresses = context.set_state({wallet_address: state_data})

        if len(addresses) < 1:
            raise InternalError("State Error")


def setup_loggers():
    logging.basicConfig()
    logging.getLogger().setLevel(logging.DEBUG)


try:
    setup_loggers()
    # Register the transaction handler and start it.
    processor = TransactionProcessor(url='tcp://172.18.0.5:4004')

    handler = MetaHealthTransactionHandler(prefix_address())

    processor.add_handler(handler)

    processor.start()

except KeyboardInterrupt:
    pass
except SystemExit as err:
    raise err
except BaseException as err:
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)
