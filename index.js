var data = document.getElementById('displaySection');
async function getSection(a){
    try{
        data.innerHTML = "";
    let sectionArray = ["World","arts","politics","nyregion","Business","Opinion","technology","Science","Health","Sports","us","Books","fashion","Food","Travel","Magazine","T-Magazine","realestate", "movies","automobiles","insider", "obituaries", "sundayreview", "theater",  "upshot"];
    let months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    let sectionSelect = sectionArray[a-1];
    let myAPI = 'rbsfRyXqXYtw4IFEGjyIYygrgl1uGJ8y';
    let url = `https://api.nytimes.com/svc/topstories/v2/${sectionSelect}.json?api-key=${myAPI}`;
    var value = await fetch(url);
    var input = await value.json();
    let row = document.createElement('div');
    row.className = 'row mt-3';
    row.setAttribute("style","margin-right: 0px");
    for(var i=0; i<input.results.length; i++)
    {
        var col = document.createElement('div');
        col.className = 'col col-12 mt-3 ml-2';
        let myDate = new Date(input.results[i].created_date);
        let createdMonth = months[myDate.getMonth()];
        let createdDate = myDate.getDate();
        let createdPeriod = createdMonth + " " + createdDate;
        if(input.results[i].section=="us")
        {
            let convert = input.results[i].section;
            input.results[i].section = convert.toUpperCase();
        }
        else if(input.results[i].section=="nyregion")
        {
            input.results[i].section = "New York";
        }
        printArea = `<div class = 'card container'>
        <div class = 'row xs-column-reverse '>
        <div class = 'col-md-8 top-padding mb-3'>
        <p class = 'card-text'>
        <strong><span class="badge badge-primary sectionTitle badge-custom" style="text-transform: capitalize;">${input.results[i].section}</span></strong><br><br>
        <span class="title">${input.results[i].title}</span>
        <div class="d-flex justify-content-between">
        <span style="color : gray"><b>${createdPeriod}</b></span><br><br>
        <span class="byLine">${input.results[i].byline}</span>
        </div><br>
        <span>${input.results[i].abstract}</span><br><br>
        <a href="${input.results[i].url}">Continue Reading</a>
        </div>
        <div class="col-md-4 right-padding">
        <img src = '${input.results[i].multimedia[0].url}' class = 'card-img' id = 'image'>
        </p>
        </div>
        </div>
        </div>
        `;
        col.innerHTML = printArea;
        row.appendChild(col);
        data.appendChild(row);
    }
    }
    catch{
        console.log("")
    }
}