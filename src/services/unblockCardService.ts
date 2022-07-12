import * as cardRepository from "./../repositories/cardRepository.js";
import * as cardUtils from "./../utils/cardUtils.js";

export async function unblockCardService(id: number, password: string){
    const card = await cardUtils.checkCardIsRegistered(id);

    cardUtils.checkCardHasNotExpired(card.expirationDate);

    const blockedStatusToCheck = true;
    cardUtils.checkCardBlockedStatus(card.isBlocked, blockedStatusToCheck);

    cardUtils.checkPassword(card.password, password);

    await cardRepository.update(id, { isBlocked: false });
}