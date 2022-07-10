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

const errorResponses = {
    notFound,
    conflict
};

export default errorResponses;