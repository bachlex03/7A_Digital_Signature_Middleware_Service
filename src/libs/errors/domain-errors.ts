import { Error } from './error';

export namespace Errors {
  export namespace User {
    export const DoesNotExist = Error.BadRequest(
      'User.DoesNotExist',
      'User does not exist',
      'DigitalSignatureService',
    );
    export const AlreadyExists = Error.BadRequest(
      'User.AlreadyExists',
      'User already exists',
      'DigitalSignatureService',
    );
    export const CannotBeCreated = Error.BadRequest(
      'User.CannotBeCreated',
      'User cannot be created',
      'DigitalSignatureService',
    );
    export const InvalidCredentials = Error.BadRequest(
      'User.InvalidCredentials',
      'Invalid credentials',
      'DigitalSignatureService',
    );
    export const CannotBeUpdated = Error.BadRequest(
      'User.CannotBeUpdated',
      'User cannot be updated',
      'DigitalSignatureService',
    );
  }

  export namespace DigitalSignature {
    export const InvalidSignature = Error.BadRequest(
      'DigitalSignature.InvalidSignature',
      'Digital signature is invalid',
      'DigitalSignatureService',
    );
    export const SignatureNotFound = Error.NotFound(
      'DigitalSignature.SignatureNotFound',
      'Digital signature not found',
      'DigitalSignatureService',
    );
    export const CannotCreateSignature = Error.BadRequest(
      'DigitalSignature.CannotCreateSignature',
      'Cannot create digital signature',
      'DigitalSignatureService',
    );
    export const CannotVerifySignature = Error.BadRequest(
      'DigitalSignature.CannotVerifySignature',
      'Cannot verify digital signature',
      'DigitalSignatureService',
    );
    export const KeyNotFound = Error.NotFound(
      'DigitalSignature.KeyNotFound',
      'Signing key not found',
      'DigitalSignatureService',
    );
    export const InvalidKey = Error.BadRequest(
      'DigitalSignature.InvalidKey',
      'Invalid signing key',
      'DigitalSignatureService',
    );
  }

  export namespace Sample {
    export const DoesNotExist = Error.NotFound(
      'Sample.DoesNotExist',
      'Sample does not exist',
      'DigitalSignatureService',
    );
    export const CannotBeCreated = Error.BadRequest(
      'Sample.CannotBeCreated',
      'Sample cannot be created',
      'DigitalSignatureService',
    );
    export const CannotBeUpdated = Error.BadRequest(
      'Sample.CannotBeUpdated',
      'Sample cannot be updated',
      'DigitalSignatureService',
    );
    export const CannotBeDeleted = Error.BadRequest(
      'Sample.CannotBeDeleted',
      'Sample cannot be deleted',
      'DigitalSignatureService',
    );
  }

  export namespace Validation {
    export const InvalidInput = Error.BadRequest(
      'Validation.InvalidInput',
      'Invalid input data',
      'DigitalSignatureService',
    );
    export const MissingRequiredField = Error.BadRequest(
      'Validation.MissingRequiredField',
      'Missing required field',
      'DigitalSignatureService',
    );
    export const InvalidFormat = Error.BadRequest(
      'Validation.InvalidFormat',
      'Invalid data format',
      'DigitalSignatureService',
    );
  }
}
