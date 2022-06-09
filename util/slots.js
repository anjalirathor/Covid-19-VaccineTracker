const axios = require('axios').default;
const dataTime = require("@arnabbiswas/date-time");
const Table=require('tty-table');
const chalk=require('chalk');
var inquirer = require('inquirer');
const notifier = require('node-notifier');
const {config,options}=require('./config');

module.exports=function(districtid){
  // var date=new Date();
//   var todaysDate=`${date.getDate()}-${String(
//  date.getMonth() +1
//   ).padStart(2,"0")}-$(date.getFullYear()}`;
  const todaysDate=await dataTime.getCurrentDateTime('DD-MMM-YYYY');
  inquirer
  .prompt([{
    /* Pass your questions in here */
    type:"list",
    name:"choice",
    message:"Please choose age group",
    choices:[
      {
        name:"All ages",
        values:""
      },
      {
        name:"45+",
        value:"45"
      },
      {
        nmae:"18-45",
        value:"18"
      }
    ]
  }])
  .then((answers) => {
    // Use user feedback for... whatever!!
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=${todaysDate}`,config)
  .then(function (response) {
    // handle success
    // console.log(response.data.states);
    let header = [{
      value: "name",
      headerColor: "cyan",
      color: "white",
      align: "left",
      alias:"Center Name",
      width: 40
    },
    {
      value: "address",
      color: "red",
      alias:"center address",
      width: 40,
    },
    {
      value: "available",
      color: "red",
      alias:"Available slot",
      width: 20,
    },
    {
      value: "age",
      color: "red",
      alias:"Age",
      width: 10,
    },
    {
      value: "date",
      color: "red",
      alias:"Date",
      width: 20,
    }
  ]
    // const out = Table(response.data.centers).render()
    // console.log(response.data.centers); //prints output
    var finalData=[];
    var districtName;
    response.data.centers.forEach((item)=>{
      // console.log(item);
      districtName=item.district_name
      item.sessions.forEach((session)=>{
          let ourData={
            center:item.name,
            address:item.address,
            available:session.available_capacity,
            age:session.min_age_limit,
            date:session.date
          };
          finalData.push(ourData);
      })
    });
    const out = Table(header,finalData,options).render()
    console.log(chalk.blue.bgGreen.bold(`Date for which run -> ${todaysDate}`));
    console.log(chalk.blue.bgGreen.bold(`District -> ${districtName}`));
    
    console.log(out); //prints output

// Object
  notifier.notify({
  title: 'Cowin Slots Executed',
  subtitle:'subtitle',
  message: 'Cowin Slots Executed',

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
// Make a request for a user with a given ID

}