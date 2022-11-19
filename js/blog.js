document.onload = makeBlog;
function makeBlog(){
   const blogList = document.createElement('ol');
   blogList.className = "olBlog";
   
const blogItems= [
{title: '1. Overview of Data Visualization', link: '../pages/blog1.html', class: 'blOne'} ,
{title: '2. UX/UI Reflection', link: '../pages/blog2.html', class: 'blTwo'},
{title: '3. What is Interaction?', link: '../pages/blog3.html', class: 'blTwo'},
{title: '4. Data Art Reflection', link: '../pages/blog4.html', class: 'blTwo'}
];
for(let item of blogItems){

    const blogLink = document.createElement('li');
   blogLink.className = 'blogSelection';
   const aBlog = document.createElement('a');
   aBlog.innerText = item.title;
   aBlog.href = item.link;
   aBlog.className = item.class;
   blogLink.appendChild(aBlog);
   blogList.appendChild(blogLink);


}
const footer = document.getElementsByClassName("universalFoot");
document.body.insertBefore(blogList, footer)
   

}