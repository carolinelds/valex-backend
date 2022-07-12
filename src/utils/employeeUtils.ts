import errorResponses from "../responses/errorResponses.js";

export function checkEmployeeIsFromCompany(companyId: number, employeeCompanyId: number){
    const checkMe = companyId === employeeCompanyId;
    if (!checkMe) {
        return errorResponses.notFound("On this company this employee was")
    }

    return;
}
