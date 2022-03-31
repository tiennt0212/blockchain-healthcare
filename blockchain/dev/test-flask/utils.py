import hashlib
from constants import FAMILY_NAME


def hash(data):
    '''Compute the SHA-512 hash and return the result as hex characters.'''
    return hashlib.sha512(data).hexdigest()


def prefix_address():
    return hash(FAMILY_NAME.encode('utf-8'))[0:6]
