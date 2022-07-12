import * as cardUtils from "./../utils/cardUtils.js";
import * as paymentRepository from "./../repositories/paymentRepository.js";
import * as businessRepository from "./../repositories/businessRepository.js";
import errorResponses from "./../responses/errorResponses.js";

export async function makePaymentService(cardId: number, password: string, businessId: number, amount: number){

    const card = await cardUtils.checkCardIsRegistered(cardId);

    cardUtils.checkCardHasBeenActivated(card.password);

    cardUtils.checkCardHasNotExpired(card.expirationDate);

    cardUtils.checkCardBlockedStatus(card.isBlocked, false);

    cardUtils.checkPassword(card.password, password);

    const business = await checkBusinessIsRegistered(businessId);

    checkTypeOfBusiness(business.type, card.type);

    checkBalanceCoversPayment(card.id, amount);

    const paymentData = {
        cardId,
        businessId,
        amount
    };
    
    await paymentRepository.insert(paymentData);

    return;
}

async function checkBusinessIsRegistered(businessId: number){
    const business = businessRepository.findById(businessId);
    if (!business) {
        return errorResponses.notFound("Business");
    }

    return business;
}

function checkTypeOfBusiness(businessType: string, cardType: string){
    if (businessType !== cardType){
        return errorResponses.unprocessableEntity("business and/or card type");
    }

    return;
}

async function checkBalanceCoversPayment(cardId: number, amount: number){
    const { balance } = await cardUtils.getTransactionsData(cardId);

    if (balance < amount){
        return errorResponses.unprocessableEntity("card balance");
    }

    return;
}