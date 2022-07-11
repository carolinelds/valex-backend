import dayjs from "dayjs";
import customParseFormat from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import "./../setup.js";

import * as cardRepository from "./../repositories/cardRepository.js";
import * as cardUtils from "./../utils/cardUtils.js";
import errorResponses from "./../responses/errorResponses.js";

export async function activateCardService(id: number, securityCode: string, password: string){

    const card : cardRepository.Card = await cardUtils.checkCardIsRegistered(id);
    
    await cardUtils.checkCardHasNotExpired(card.expirationDate);

    checkCardHasNotBeenActivated(card.password);

    await validateSecurityCode(card, securityCode);

    const SALT = +process.env.CRYPT_KEY;
    const hashedPassword = bcrypt.hashSync(password, SALT);

    await cardRepository.update(id, { password: hashedPassword });
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