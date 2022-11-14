import React from 'react'
/* eslint-disable */
//Report Viewer source
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css';
//Data-Visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
//Reports react base
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';
import { useLocation } from 'react-router-dom';


var toolbarSettings = {
  items: ~ej.ReportViewer.ToolbarItems.Parameters,
}

const ReportViewerComponent = ({reportParam}) => {
  const location = useLocation()

  const reportName = location.pathname.replace("/report-view/","")
  
 // const reportName = params[0]
 // const accessToken = params[1]

  const {parameters:reportParams, token: accessToken} = JSON.parse(localStorage.getItem(reportName))

  
 
  const renderD = () => {
    let arr = []
    const obKeys = Object.keys(reportParam)
    obKeys.forEach((x) => {
      let obj = {
        name: x,
        labels: [x],
        values: [reportParam[x]],
        nullable: false,
      }

      arr.push(obj)
    })

    return arr
  }

  
  window.onbeforeunload = function() {
    localStorage.removeItem(reportName);
    return '';
  };
  


    const onAjaxRequest = (event) => {
      event.headers.push({
      Key: 'Authorization', Value: `Bearer ${accessToken}`
      });
    }

  return (
    <div style={{height:"99vh", padding:0, margin:0, overflow:"hidden"}}> 
     <BoldReportViewerComponent
      id='reportviewer-container'
      reportServerUrl="http://192.168.0.71/Reports_SSRS/"
      reportServiceUrl="http://psl-linux:5100/api/ReportViewer"
      reportPath={`/PersonaX Payroll-Standard/${reportName}`}
      ajaxBeforeLoad={onAjaxRequest}
      toolbarSettings={toolbarSettings}
      parameters={reportParams}
    />



       {/* <BoldReportViewerComponent
        toolbarSettings={toolbarSettings}
        id="reportviewer-container"
        reportServiceUrl = {'https://demos.boldreports.com/services/api/ReportViewer'}
        reportPath = {'~/Resources/docs/sales-order-detail.rdl'} >
        </BoldReportViewerComponent> */}
    </div>
  )
}

export default ReportViewerComponent

