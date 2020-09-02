import { LightningElement, api, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import LOCALE from '@salesforce/i18n/locale';


export default class SetDateTestLWC extends LightningElement {
    @api recordId;
    @api fieldAPINameSD;
    @api fieldAPINameED;   

    
     handleRefresh() {

        // Tested way to setup a Date field in a record

        //let SD = new Intl.DateTimeFormat(LOCALE).format(new Date());
        //let SD = new Date().toISOString().slice(0,10)
        //let SD = new Date('Sun May 11,2014').toLocaleDateString('it-IT')
        
        //const date = new Date('2010-08-05')
        //const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }); 
        //const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date );
        //console.log(`${day}-${month}-${year }`);
        //let SD = new Date('YYYY-MM-DDTHH:mm:ss.sssZ);
        
        
        //var dateobjSD = new Date('2020, 08, 31, 00, 00, 00, 00');
        //let SD = dateobjSD.toISOString();
        let SD = new Date(2018, 11, 24, 10, 0, 0, 0);
        let usableSD = SD.toISOString();

        console.log("@@@ start date valkue is: " + usableSD);

        //var dateobjED = new Date('2020, 09, 1, 00, 00, 00, 00');
        //let ED = dateobjED.toISOString();
        let ED = new Date(2019, 10, 18, 10, 0, 0, 0);
        let usableED = ED.toISOString();
        console.log("@@@ end date value is: "  + usableED);


        const fields = {};
            fields['Id'] = this.recordId;
            fields[this.fieldAPINameSD] = usableSD;
            fields[this.fieldAPINameED] = usableED;
           
        const recordInput = { fields };
        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfully Updated!',
                        variant: 'success'
                    })
                );
                // Display fresh data in the form
                return refreshApex(this.contact);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

}