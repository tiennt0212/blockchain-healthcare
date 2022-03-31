from sawtooth_sdk.processor.core import TransactionProcessor
import MetaHealthTransactionHandler
from MetaHealthTransactionHandler import MetaHealthTransactionHandler
from utils import prefix_address


def running_tp():
    processor = TransactionProcessor(url='tcp://172.18.0.5:4004')
    handler = MetaHealthTransactionHandler(prefix_address())
    processor.add_handler(handler)
    processor.start()
