document.onreadystatechange = (event) =>{
  if(document.readyState === 'complete'){
    app();
  }
}

function app() {
  QL.initializer('/graphql');
  const searchButton = document.getElementById('search_button');
  const allButton = document.getElementById('all_button');
  allButton.addEventListener('click', queryAll);
  searchButton.addEventListener('click', query);
}

function query() {
  const searchOption = document.getElementById("search_option");
  const searchField = searchOption.options[searchOption.selectedIndex].value;
  const searchText = document.getElementById('search_input').value;
  if (searchField === 'name') {
    let method = 'getProjectByName';
    let args = {name : searchText};
    let returnVals = ['name', {company : ['name'] }, 'description'];
    QL('#projects').query(method, args, returnVals)
      .then(res => {
        console.log(res);
      }); 
    // QL.getProjectByName(args, returnVals)
    //   .then(res => {
    //     console.log('result:', res.data.getProjectByName);
    //   });
  }
  if (searchField === 'company') {
    let method = 'getProjectsByCompany';
    let args = {company : searchText};
    let returnVals = ['name', {company : ['name'] }, 'description'];
    console.log(QL.getProjectsByCompany);
    QL('#projects').query(method, args, returnVals, {cache : true})
      .then(res => {
        console.log('DOM:', res);
      });
    // QL.getProjectsByCompany(args, returnVals, {cache : true})
    //   .then(res => {
    //     console.log('result:', res.data);
    //   });
  }
};

function queryAll() {
  QL.getProjects({}, ['name', {company : ['name'] }, 'description'])
    .then(res => {
      console.log('result:', res.getProjects);
    });
  QL('#projects').query('getProjects', {}, ['name', {company : ['name'] }, 'description'])
    .then(res => {
      console.log(res);
    });
};