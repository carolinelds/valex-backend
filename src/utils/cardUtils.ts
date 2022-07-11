import dayjs from "dayjs";
import customParseFormat from "dayjs";

import * as cardRepository from "./../repositories/cardRepository.js";
import errorResponses from "./../responses/errorResponses.js";

export async function checkCardIsRegistered(id: number) : Promise<any>{
    const card = await cardRepository.findById(id);
    if (!card){
        return errorResponses.notFound("Card");
    }
    return card;
}

export async function checkCardHasNotExpired(expirationDate: string) : Promise<any>{
    dayjs.extend(customParseFormat);

    const expMonth = (parseInt(expirationDate.slice(0,2))+1).toString().padStart(2, '0');
    const expYear = expirationDate.slice(3);
    const expDate = expMonth + '-01-' + expYear;

    const formatedExpirationDate = dayjs(dayjs(expDate, 'MM-DD-YY')['$d']);
    const today = dayjs();

    const diff = formatedExpirationDate.diff(today); 
    if (diff <= 0){
        return errorResponses.unprocessableEntity("card expiration date");
    }

    return;
}

export function checkCardHasBeenActivated(password: string | null){
    if (password === null){
        return errorResponses.unprocessableEntity("card activation status");
    }

    return;
}
