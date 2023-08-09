<template>
    <div id="datatable"></div>
</template>

<script>
import {Datatable, initTE} from 'tw-elements'
import BacklogReportDataServices from '@/services/BacklogReportDataServices';
export default{
    async mounted (){
        initTE({Datatable})
        const columns = [
            {label:'Created At' ,field:'createdAt'},
            {label:'Miner Name' ,field:'minerName'},
            {label:'Display ID' ,field:'displayId'},
            {label:'Alert ID' ,field:'alertId'},
            {label:'Customer ID' ,field:'customerId'},
            {label:'Customer Name' ,field:'customerName'},
            {label:'Label' ,field:'label'},
            {label:'SAR Probability' ,field:'probabilityOfSar'},
            {label:'Type 1' ,field:'type1'},
            {label:'Type 2' ,field:'type2'},
            {label:'Filters' ,field:'filters'},
        ]
        const table = new Datatable(
            document.getElementById('datatable'),
            { columns, }, 
            { loading: true }
        )
        let data = JSON.stringify({
                    "displayId": "",
                    "endDate": "2023-08-09",
                    "endTime": "23:59",
                    "excelMultiple": 0,
                    "label": "",
                    "minerNames": null,
                    "page": 0,
                    "probabilityOfSarMax": null,
                    "probabilityOfSarMin": null,
                    "startDate": "2023-02-01",
                    "startTime": "00:00"
                })
        const res = await BacklogReportDataServices.getBacklogResult(data, this.store.token)
        const reports = JSON.parse(JSON.stringify(res.data.item1))
        table.update({
            rows: reports.map((report) => {
                eport
            })
        })
    }
    
}
</script>