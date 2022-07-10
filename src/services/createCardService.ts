import { faker } from '@faker-js/faker';

import errorResponses from "../responses/errorResponses.js";
import * as employeeRepository from "./../repositories/employeeRepository.js";
import * as cardRepository from "./../repositories/cardRepository.js";

export async function createCardService(companyId: number, employeeId: number, type: string) {

    /* FIXME: turn into middlewares ---------------------- */

            const employee = await checkEmployeeIsRegistered(employeeId);

            const checkEmployeeIsFromCompany = companyId === employee.companyId;
            if (!checkEmployeeIsFromCompany) {
                return errorResponses.notFound("On this company this employee was")
            }

            if (!cardRepository.isTransactionType(type)){
                return errorResponses.notFound("Card type");
            }

            await checkDoesNotHaveCardOfThisType(employeeId, type);

    /* end of FIXME -------------------------------------- */

    /* 
    preciso gerar agora:
        - [OK] employeeId: do BODY
        - [OK] number: UNIQUE
        - cardHolderName
        - securityCode
        - expirationDate
        - password
        - isVirtual: false
        - originalCardId: null 
        - isBlocked: true
        - [OK] type: do BODY
    */    
 
    const cardNumber : string = await generateCardNumber('####-####-####-####');
    
    const cardHolderName : string = await generateCardHolderName(employeeId);
}

/* FIXME: turn into middlewares ---------------------- */

        async function checkEmployeeIsRegistered(employeeId: number): Promise<any> {
            const employee = await employeeRepository.findById(employeeId);
            if (!employee) {
                return errorResponses.notFound("Employee");
            }

            return employee;
        }

        async function checkDoesNotHaveCardOfThisType(employeeId: number, type: cardRepository.TransactionTypes): Promise<any> {

            const cardOfThisType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
            if (cardOfThisType){
                return errorResponses.conflict("A card of this type is");
            }

            return;
        }

/* end of FIXME -------------------------------------- */

async function generateCardNumber(format: string) : Promise<string> {
    
    let cardNumber : string = faker.finance.creditCardNumber(format);

    let cardWithThisNumber = await cardRepository.findByNumber(cardNumber);
    
    while (cardWithThisNumber){
        cardNumber = faker.finance.creditCardNumber();
        cardWithThisNumber = await cardRepository.findByNumber(cardNumber);
    }
    
    return cardNumber;
}

async function generateCardHolderName(employeeId: number) : Promise<string> {

    const { fullName } = await employeeRepository.findById(employeeId);

    let temp = fullName.toUpperCase().split(' ');

    const initialName = temp[0];
    const lastName = temp[temp.length - 1];

    let middleNames = temp.filter((name, index) => { 
        return (
            name.length >= 3 && 
            index !== 0 && 
            index !== temp.length - 1
        )
    });
    middleNames = middleNames.map(name => {
        return name[0];
    });
    const shortMiddleNames = middleNames.join(' ');

    return initialName + ' ' + shortMiddleNames + ' ' + lastName;
}
