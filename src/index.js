document.onreadystatechange = (event) =>{
  if(document.readyState === 'complete'){
    app();
  }
}

function app() {
  QL.initializer();
  const searchButton = document.getElementById('search_button');
  searchButton.addEventListener('click', query);
}

function query() {
  const searchOption = document.getElementById("search_option");
  const searchField = searchOption.options[searchOption.selectedIndex].value;
  const searchText = document.getElementById('search_input').value;
  if (searchField === 'name') {
    let method = 'getProjectByName';
    let args = {name : searchText};
    let returnVals = ['name', 'company', 'description'];
    // QL('#projects').query(method, args, returnVals)
    //   .then(res => {
    //     console.log('success');
    //   }); 
    QL.getProjectByName(args, returnVals)
      .then(res => {
        console.log('result:', res.data.getProjectByName);
      });
  }
  if (searchField === 'company') {
    let method = 'getProjectsByCompany';
    let args = {company : searchText};
    let returnVals = ['name', 'company', 'description'];
    // QL('#projects').query(method, args, returnVals)
    //   .then(res => {
    //     console.log(res);
    //   }); 
    QL.getProjectsByCompany(args, returnVals)
      .then(res => {
        console.log('result:', res.data.getProjectsByCompany);
      });
  }
  console.log('search field:', searchField);
  console.log('search text:', searchText);
};