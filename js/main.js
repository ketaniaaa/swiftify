document.body.onload = makeNav;
function makeNav(){

const header = document.createElement('header');
const navTitle = document.createElement('a');
navTitle.href ='../index.html';
navTitle.innerText = "swiftify";
navTitle.className = "navTitle"
header.appendChild(navTitle);

const navBar = document.createElement('nav');
navBar.className = "navigation";
header.appendChild(navBar);

const navList = document.createElement('ul');
navList.className="ulNav";

const navItems =[
    {title: 'blog', link: '../pages/blog.html'},
    {title: 'design' , link: '../pages/design.html'},
    {title:'data' , link: '../pages/data.html'}
];

for(let item of navItems){
    const li = document.createElement('li');
    const a = document.createElement('a');
    li.className = "liNav";
    a.className ="aNav";
    a.innerText = item.title;
    a.href = item.link;
    li.appendChild(a);
    navList.appendChild(li);
}
navBar.appendChild(navList);

const footer = document.createElement('footer');
footer.className = 'universalFoot';


const credits =document.createElement('p');
credits.innerText = "ketania govender 2022";
footer.appendChild(credits);
const credLinks = document.createElement('ul');
credLinks.className ="ulFoot";

const footItems = [
    {ftitle: 'references-', flink: '../pages/refs.html'},
    {ftitle: 'figma-', flink: 'https://www.figma.com/file/nXSbUGQVQb5hufBDDgLNSY/Swiftify?node-id=0%3A1'},
    {ftitle: 'github-', flink: 'https://github.com/ketaniaaa/swiftify'},
    {ftitle: 'account access', flink: '../pages/accountaccess.html'}

];

for(let item of footItems){
    const fli = document.createElement('li');
    const fa = document.createElement('a');
    fli.className = "liFoot";
    fa.className = "aFoot";
    fa.target = "_blank";
    fa.innerText = item.ftitle;
    fa.href = item.flink;
    fli.appendChild(fa);
    credLinks.appendChild(fli);
}
footer.appendChild(credLinks);









const hedd = document.getElementById("main");
const end = document.getElementById("end");
document.body.insertBefore(header, hedd);
document.body.insertBefore(footer, end );
var date = new Date();
var today = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
document.getElementById('date').innerText = today;
}
 
function alertUser(){
    alert("log in on home page first for more accurate visualizations");
}




