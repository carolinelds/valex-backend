export function notFound(entity: string):{ type: string, message: string}{
    throw {
        type: "error_not_found",
        message: `${entity} not found.`
    }
}

const errorResponses = {
    notFound
};

export default errorResponses;