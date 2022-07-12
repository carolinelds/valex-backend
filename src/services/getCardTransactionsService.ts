import * as cardRepository from "./../repositories/cardRepository.js";
import errorResponses from "./../responses/errorResponses.js";
import * as cardUtils from "./../utils/cardUtils.js";

export async function getCardTransactionsService( number: string, cardholderName: string, expirationDate: string ){

    const card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate);
    if (!card) {
        return errorResponses.notFound("Card");
    };

    const transactions = await cardUtils.getTransactionsData(card.id);

    return transactions;
}