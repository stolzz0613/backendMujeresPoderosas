const {GoogleSpreadsheet} = require('google-spreadsheet');
const credenciales = require('../../secrets.json');

let googleId="1IKOzg9MLARyNIMeXj26MJ6-WYZXaEH-gD6XGV0iRkBM";

async function accederGoogleSheet(){

    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();

    const sheet = documento.sheetsByIndex[0];
    const registros = await sheet.getRows();

    return registros;
}

async function guardarFrase(pObjeto) {
    //console.log(pObjeto)
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();
    const sheet = documento.sheetsById[0];

    await sheet.addRow(pObjeto);
}

module.exports={
    accederGoogleSheet : accederGoogleSheet,
    guardarFrase : guardarFrase
}