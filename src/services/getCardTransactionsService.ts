import * as cardRepository from "./../repositories/cardRepository.js";
import * as paymentRepository from "./../repositories/paymentRepository.js";
import * as rechargeRepository from "./../repositories/rechargeRepository.js";
import errorResponses from "./../responses/errorResponses.js";

export async function getCardTransactionsService( number: string, cardholderName: string, expirationDate: string ){

    const card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate);
    if (!card) {
        return errorResponses.notFound("Card");
    };

    const payments = await paymentRepository.findByCardId(card.id);    
    let sumPayments = 0;
    payments.forEach(payment => sumPayments += payment.amount);

    const recharges = await rechargeRepository.findByCardId(card.id);
    let sumRecharges = 0;
    recharges.forEach(recharge => sumRecharges += recharge.amount);

    const balance = sumRecharges - sumPayments;

    const transactions = {
        balance,
        transactions: payments,
        recharges
    };

    return transactions;
}