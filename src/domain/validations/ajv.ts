import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

export const ajv = new Ajv({
	allErrors: true,
});

addErrors(ajv);
addFormats(ajv);
