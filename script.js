const menuItems = [
{
    name:'Irish coffee', category:'Coffee', desc:'Fragrant black coffee with Irish whiskey and whipped milk', price:7, img:'./coffee-1.jpg'
}
,
{
    name:'Kahlua coffee', category:'Coffee', desc:'Classic coffee with milk and a smooth, creamy top', price:7, img:'./coffee-2.jpg'
}
,
{
    name:'Honey raf', category:'Coffee', desc:'Espresso with frothed milk, cream and aromatic honey', price:5.5, img:'./coffee-3.jpg'
}
,
{
    name:'Ice cappuccino', category:'Coffee', desc:'Cappuccino with soft thick foam in a refreshing iced version', price:5, img:'./coffee-4.jpg'
}
,
{
    name:'Espresso', category:'Coffee', desc:'Classic strong black coffee with a rich aroma', price:4.5, img:'./coffee-5.jpg'
}
,
{
    name:'Latte', category:'Coffee', desc:'Espresso with steamed milk and delicate milk foam', price:5.5, img:'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=85'
}
,
{
    name:'Latte macchiato', category:'Coffee', desc:'Espresso layered with frothed milk and a soft coffee flavor', price:5.5, img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85'
}
,
{
    name:'Coffee with cognac', category:'Coffee', desc:'Fragrant coffee with a creamy top', price:6.5, img:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=85'
}
,
{
    name:'Moroccan', category:'Tea', desc:'Fragrant black tea with tangerine, cinnamon, honey, lemon and mint', price:4.5, img:'./tea-1.jpg'
}
,
{
    name:'Ginger', category:'Tea', desc:'Black tea with fresh ginger, lemon and honey', price:5, img:'./tea-2.jpg'
}
,
{
    name:'Cranberry', category:'Tea', desc:'Invigorating tea with cranberry and honey', price:5, img:'./tea-3.jpg'
}
,
{
    name:'Sea buckthorn', category:'Tea', desc:'Sweet tea with sea buckthorn, fresh thyme and cinnamon', price:5.5, img:'./tea-4.jpg'
}
,
{
    name:'Marble cheesecake', category:'Dessert', desc:'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam', price:3.5, img:'./dessert-1.jpg'
}
,
{
    name:'Red velvet', category:'Dessert', desc:'Layer cake with cream cheese frosting', price:4, img:'./dessert-2.jpg'
}
,
{
    name:'Cheesecakes', category:'Dessert', desc:'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar', price:4.5, img:'./dessert-3.png'
}
,
{
    name:'Creme brulee', category:'Dessert', desc:'Delicate creamy dessert in a caramel basket with wild berries', price:4.5, img:'./dessert-4.jpg'
}
];
const $ = id => document.getElementById(id);
let currentCategory='Coffee',  selectedItem=menuItems[0],  sizeExtra=0,  addonTotal=0;
function money(n) {
    return '$'+n.toFixed(2)
}
function renderProducts() {
    const items=menuItems.filter(x=>x.category===currentCategory);
    $('products').innerHTML=items.map(x=>`<article class="product" tabindex="0" data-name="${x.name}"><img src="${x.img}" alt="${x.name}"><div class="product-body"><h3>${x.name}</h3><p>${x.desc}</p><strong>${money(x.price)}</strong></div></article>`).join('');
    document.querySelectorAll('.product').forEach(card=> {
        const open=()=>openDetails(menuItems.find(x=>x.name===card.dataset.name));card.addEventListener('click',open);card.addEventListener('keydown',e=> {
            if(e.key==='Enter')open()
        }
        )
    }
    );
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=> {
    currentCategory=btn.dataset.category;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn));renderProducts()
}
));
$('theme').addEventListener('click',()=> {
    document.body.classList.toggle('dark');$('theme').textContent=document.body.classList.contains('dark')?'☼ Light':'☾ Dark'
}
);
$('hamburger').addEventListener('click',()=>$('nav').classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>$('nav').classList.remove('open')));
const featured=[menuItems[2], menuItems[5], menuItems[8]];
let featuredIndex=0;
function renderFeature() {
    const x=featured[featuredIndex];
    $('featureImg').src=x.img;
    $('featureImg').alt=x.name;
    $('featureName').textContent=x.name;
    $('featureDesc').textContent=x.desc;
    $('featurePrice').textContent=money(x.price);
    $('dots').innerHTML=featured.map((_,i)=>`<button class="${i===featuredIndex?'active':''}" aria-label="Featured item ${i+1}" data-i="${i}"></button>`).join('');
    document.querySelectorAll('#dots button').forEach(b=>b.onclick=()=> {
        featuredIndex=+b.dataset.i;renderFeature()
    }
    )
}
$('prev').onclick=()=> {
    featuredIndex=(featuredIndex+featured.length-1)%featured.length;
    renderFeature()
}
;
$('next').onclick=()=> {
    featuredIndex=(featuredIndex+1)%featured.length;
    renderFeature()
}
;
$('featureImg').onclick=()=>openDetails(featured[featuredIndex]);
function openDetails(item) {
    selectedItem=item;
    sizeExtra=0;
    addonTotal=0;
    $('detailImg').src=item.img;
    $('detailImg').alt=item.name;
    $('detailName').textContent=item.name;
    $('detailDesc').textContent=item.desc;
    document.querySelectorAll('#sizes button').forEach((b,i)=>b.classList.toggle('selected',i===0));
    document.querySelectorAll('.add-ons button').forEach(b=>b.classList.remove('active'));
    updateTotal();
    $('details').showModal()
}
function updateTotal() {
    $('total').textContent=money(selectedItem.price+sizeExtra+addonTotal)
}
document.querySelectorAll('#sizes button').forEach(b=>b.addEventListener('click',()=> {
    document.querySelectorAll('#sizes button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');sizeExtra=Number(b.dataset.add);updateTotal()
}
));
document.querySelectorAll('.add-ons button').forEach(b=>b.addEventListener('click',()=> {
    b.classList.toggle('active');addonTotal=[...document.querySelectorAll('.add-ons button.active')].reduce((s,x)=>s+Number(x.dataset.addon),0);updateTotal()
}
));
$('close').onclick=()=>$('details').close();
$('details').addEventListener('click',e=> {
    if(e.target===$('details'))$('details').close()
}
);
$('addOrder').onclick=()=> {
    $('details').close();
    $('toast').textContent=selectedItem.name+' added to your order! Total: '+$('total').textContent;
    $('toast').classList.add('show');
    setTimeout(()=>$('toast').classList.remove('show'),2600)
}
;
renderProducts();
renderFeature();
