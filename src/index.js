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
    let returnVals = ['name', 'team', 'description'];
    QL('#projects').query(method, args, returnVals, {cache : true});
    // QL.getProjectByName(args, returnVals)
    //   .then(res => {
    //     console.log('result:', res);
    //   });
  }
  if (searchField === 'team') {
    let method = 'getProjectsByTeam';
    let args = {team : searchText};
    let returnVals = ['name', 'team', 'description'];
    QL('#projects').query(method, args, returnVals);
    // QL.getProjectsByCompany(args, returnVals, {cache : true})
    //   .then(res => {
    //     console.log('result:', res);
    //   });
  }
};

function queryAll() {
  QL('#projects').query('getProjects', {}, ['name', 'team', 'description']);
  // QL.getProjects({}, ['name', {company : ['name'] }, 'description'])
  //   .then(res => {
  //     console.log('result:', res);
  //   });
};