import dayjs from "dayjs";
import customParseFormat from "dayjs";
import Cryptr from "cryptr";
import "./../setup.js";

import * as cardRepository from "./../repositories/cardRepository.js";
import errorResponses from "./../responses/errorResponses.js";

export async function activateCardService(id: number, securityCode: string, password: string){

    const card : cardRepository.Card = await checkCardIsRegistered(id);
    
    await checkCardHasNotExpired(card.expirationDate);

    checkCardHasNotBeenActivated(card.password);

    await validateSecurityCode(card, securityCode);
}

async function checkCardIsRegistered(id: number) : Promise<any>{
    const card = await cardRepository.findById(id);
    if (!card){
        return errorResponses.notFound("Card");
    }
    return card;
}

async function checkCardHasNotExpired(expirationDate: string) : Promise<any>{
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

function checkCardHasNotBeenActivated(password: string | null){
    if (password !== null){
        return errorResponses.conflict("A password for this card is");
    }

    return;
}

async function validateSecurityCode(card: cardRepository.Card, securityCode : string){
    const cryptr = new Cryptr(process.env.CRYPT_KEY);

    const hashedSecurityCode = cryptr.encrypt(securityCode);

    if (card.securityCode !== hashedSecurityCode){
        return errorResponses.unprocessableEntity("card security code");
    }

    return;
}