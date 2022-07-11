export function notFound(entity: string):{ type: string, message: string}{
    throw {
        type: "error_not_found",
        message: `${entity} not found.`
    }
}

export function conflict(entity: string):{ type: string, message: string }{
    throw {
        type: "error_conflict",
        message: `${entity} already registered.`
    }
}

export function badRequest(entity: string):{ type: string, message: string}{
    throw {
        type: "error_bad_request",
        message: `${entity} is not valid, bad request.`
    }    
}

export function unprocessableEntity(entity: string):{ type: string, message: string}{
    throw {
        type: "error_unprocessable_entity",
        message: `Something is wrong with ${entity}.`
    }
}

const errorResponses = {
    notFound,
    conflict,
    badRequest,
    unprocessableEntity
};

export default errorResponses;