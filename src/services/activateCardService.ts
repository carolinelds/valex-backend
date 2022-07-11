import dayjs from "dayjs";
import customParseFormat from "dayjs";

import * as cardRepository from "./../repositories/cardRepository.js";
import errorResponses from "./../responses/errorResponses.js";

export async function activateCardService(id: number, securityCode: string, password: string){

    const card : cardRepository.Card = await checkCardIsRegistered(id);
    
    await checkCardHasNotExpired(card);
}

async function checkCardIsRegistered(id: number) : Promise<any>{
    const card = await cardRepository.findById(id);
    if (!card){
        return errorResponses.notFound("Card");
    }
    return card;
}

async function checkCardHasNotExpired(card: cardRepository.Card){
    dayjs.extend(customParseFormat);

    const expMonth = (parseInt(card.expirationDate.slice(0,2))+1).toString().padStart(2, '0');
    const expYear = card.expirationDate.slice(3);
    const expDate = expMonth + '-01-' + expYear;

    const formatedExpirationDate = dayjs(dayjs(expDate, 'MM-DD-YY')['$d']);
    const today = dayjs();

    const diff = formatedExpirationDate.diff(today); 
    if (diff <= 0){
        return errorResponses.unprocessableEntity("card expiration date");
    }

    return;
}