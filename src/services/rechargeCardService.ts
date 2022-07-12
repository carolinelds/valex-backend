import * as cardUtils from "./../utils/cardUtils.js";
import * as employeeUtils from "./../utils/employeeUtils.js";
import * as companyRepository from "./../repositories/companyRepository.js";
import * as employeeRepository from "./../repositories/employeeRepository.js";
import * as rechargeRepository from "./../repositories/rechargeRepository.js";

export async function rechargeCardService(apiKey: string | string[], cardId: number, amount: number){

    const company = await companyRepository.findByApiKey(apiKey.toString());

    const card = await cardUtils.checkCardIsRegistered(cardId);

    const employee = await employeeRepository.findById(card.employeeId);
    
    employeeUtils.checkEmployeeIsFromCompany(company.id, employee.companyId);

    cardUtils.checkCardHasBeenActivated(card.password);

    cardUtils.checkCardHasNotExpired(card.expirationDate);

    const rechargeData = {
        cardId,
        amount
    };
    
    await rechargeRepository.insert(rechargeData);

    return;
}