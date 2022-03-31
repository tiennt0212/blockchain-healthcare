from sawtooth_signing import create_context

context = create_context('secp256k1')


def gen_private_key():
    return context.new_random_private_key()


def gen_public_key(private_key):
    return context.get_public_key(private_key)
