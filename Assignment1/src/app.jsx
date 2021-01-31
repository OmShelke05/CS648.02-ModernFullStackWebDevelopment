const nameComponent= (
	<div id="myName">
	   <h2 id="name_comp">OM SHELKE</h2>
	</div>
);

const pictureComponent = (
    <div id = "myPicture">
        <img id="picture_comp" src = "./image.jpg"/>
    </div>
);

const introComponent = (
    <div id= "myIntro">
        <p id="intro_comp">
        Completed bachelor's degree in computer engineering from SPPU (formerly Pune University).
        Worked as a SOC analyst for 1.8 years. I am intrigued by cyber security operations which 
        paved my path for master's in CS with specialization in cyber security. Always looking out 
        for opportunities to fulfil my cravings to learn, embrace emerging technology.
	</p>
    </div>
            
);

const buttonComponent = (
    <div id= "myButton">
        <a href="https://github.com/OmShelke05"><button id="button_comp">VIEW MY GITHUB REPO</button></a>
    </div>

);

ReactDOM.render(nameComponent, document.getElementById('name'));
ReactDOM.render(pictureComponent, document.getElementById('picture'));
ReactDOM.render(introComponent, document.getElementById('introduction'));
ReactDOM.render(buttonComponent, document.getElementById('button'));