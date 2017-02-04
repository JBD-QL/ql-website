document.onreadystatechange = (event) =>{
  if(document.readyState === 'complete'){
    app();
  }
}

function app() {
  QL.initializer('/graphql', true);
  const searchButton = document.getElementById('search_button');
  const allButton = document.getElementById('all_button');
  allButton.addEventListener('click', queryAll);
  searchButton.addEventListener('click', query);
  // console.log('QL:', QL);
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
        console.log('success');
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
    QL('#projects').query(method, args, returnVals)
      .then(res => {
        console.log(res);
      }); 
    // QL.getProjectsByCompany(args, returnVals)
    //   .then(res => {
    //     console.log('result:', res.data.getProjectsByCompany);
    //   });
  }
};

function queryAll() {
  // QL.getProjects({}, ['name', {company : ['name'] }, 'description'])
  //   .then(res => {
  //     console.log('result:', res.data.getProjects);
  //   });
  QL('#projects').query('getProjects', {}, ['name', {company : ['name'] }, 'description']);
};