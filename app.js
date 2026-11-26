// Modo demonstração com dados salvos no navegador. Para usar a API, altere DEMO_MODE para false.
const API_URL="http://localhost:8080/api", DEMO_MODE=true;
const $=id=>document.getElementById(id);
const brl=n=>Number(n||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
let products=[],suppliers=[],movements=[],movementChart,stockChart;
function seed(){
 products=JSON.parse(localStorage.getItem("sm_products")||"null")||[
  {id:1,name:"Teclado sem fio",category:"Informática",sku:"INF-001",quantity:18,minimumStock:5,price:89.9,supplierId:1},
  {id:2,name:"Mouse óptico",category:"Informática",sku:"INF-002",quantity:4,minimumStock:8,price:39.9,supplierId:1},
  {id:3,name:"Caderno A4",category:"Papelaria",sku:"PAP-001",quantity:42,minimumStock:10,price:18.5,supplierId:2},
  {id:4,name:"Headset USB",category:"Informática",sku:"INF-003",quantity:0,minimumStock:4,price:119.9,supplierId:1},
  {id:5,name:"Caneta azul",category:"Papelaria",sku:"PAP-002",quantity:7,minimumStock:10,price:2.5,supplierId:2}
 ];
 suppliers=JSON.parse(localStorage.getItem("sm_suppliers")||"null")||[
  {id:1,name:"Tech Distribuidora",email:"vendas@tech.com.br",phone:"(81) 3333-0000"},
  {id:2,name:"Papel & Cia",email:"contato@papelcia.com.br",phone:"(81) 3222-0000"}
 ];
 movements=JSON.parse(localStorage.getItem("sm_movements")||"null")||[
  {id:1,productId:1,type:"IN",quantity:20,note:"Compra inicial",date:new Date().toISOString()},
  {id:2,productId:2,type:"OUT",quantity:3,note:"Venda",date:new Date().toISOString()},
  {id:3,productId:3,type:"IN",quantity:42,note:"Reposição",date:new Date().toISOString()}
 ];save();
}
function save(){localStorage.setItem("sm_products",JSON.stringify(products));localStorage.setItem("sm_suppliers",JSON.stringify(suppliers));localStorage.setItem("sm_movements",JSON.stringify(movements));}
async function api(path,options={}){const r=await fetch(API_URL+path,{...options,headers:{"Content-Type":"application/json",...(options.headers||{})}});if(!r.ok)throw Error("Não foi possível concluir a operação na API.");if(r.status===204)return null;return r.json();}
function safe(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function supplier(id){return suppliers.find(s=>Number(s.id)===Number(id));}
function product(id){return products.find(p=>Number(p.id)===Number(id));}
function situation(p){return p.quantity===0?"zero":p.quantity<=p.minimumStock?"low":"normal";}
function render(){
 const units=products.reduce((s,p)=>s+Number(p.quantity),0),value=products.reduce((s,p)=>s+Number(p.quantity)*Number(p.price),0);
 $("productCount").textContent=products.length;$("unitCount").textContent=units.toLocaleString("pt-BR");
 $("lowCount").textContent=products.filter(p=>situation(p)!=="normal").length;$("stockValue").textContent=brl(value);
 renderProducts();renderMovements();renderSuppliers();renderCharts();fillSelects();
}
function renderProducts(){
 const q=$("productSearch").value.toLowerCase(),list=products.filter(p=>`${p.name} ${p.category} ${p.sku}`.toLowerCase().includes(q));
 $("productTable").innerHTML=list.length?list.map(p=>{const state=situation(p),label=state==="zero"?"Sem estoque":state==="low"?"Estoque baixo":"Normal";return `<tr>
 <td><span class="product-name">${safe(p.name)}</span><span class="sku">${safe(p.sku)}</span></td><td>${safe(p.category)}</td><td>${safe(p.sku)}</td>
 <td><b>${p.quantity}</b></td><td>${p.minimumStock}</td><td>${brl(p.price)}</td><td><span class="stock-pill stock-${state}">${label}</span></td>
 <td><button class="row-action" data-quick-move="${p.id}">Movimentar ↗</button></td></tr>`;}).join(""):'<tr><td colspan="8" class="empty-message">Nenhum produto encontrado.</td></tr>';
}
function renderMovements(){
 const list=movements.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6);
 $("movementList").innerHTML=list.length?list.map(m=>`<div class="movement-item"><div class="movement-left"><span class="movement-icon ${m.type==="IN"?"movement-in":"movement-out"}">${m.type==="IN"?"↙":"↗"}</span><div><b>${safe(product(m.productId)?.name||"Produto removido")}</b><small>${m.type==="IN"?"Entrada":"Saída"} · ${new Date(m.date).toLocaleDateString("pt-BR")} · ${safe(m.note||"Sem observação")}</small></div></div><span class="movement-qty">${m.type==="IN"?"+":"−"}${m.quantity}</span></div>`).join(""):'<p class="empty-message">Nenhuma movimentação registrada.</p>';
}
function renderSuppliers(){
 $("supplierList").innerHTML=suppliers.length?suppliers.map(s=>`<div class="supplier-item"><div class="supplier-left"><span class="avatar">${safe(s.name.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase())}</span><div><b>${safe(s.name)}</b><small>${safe(s.email||"E-mail não informado")} · ${safe(s.phone||"Sem telefone")}</small></div></div></div>`).join(""):'<p class="empty-message">Nenhum fornecedor cadastrado.</p>';
}
function renderCharts(){
 if(!window.Chart)return;if(movementChart)movementChart.destroy();if(stockChart)stockChart.destroy();
 const ins=movements.filter(m=>m.type==="IN").reduce((s,m)=>s+m.quantity,0),outs=movements.filter(m=>m.type==="OUT").reduce((s,m)=>s+m.quantity,0);
 movementChart=new Chart($("movementChart"),{type:"bar",data:{labels:["Entradas","Saídas"],datasets:[{data:[ins,outs],backgroundColor:["#20a77d","#df6672"],borderRadius:7,maxBarThickness:48}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0,font:{size:9}},grid:{color:"#f0f1f5"}},x:{grid:{display:false},ticks:{font:{size:10}}}}}});
 const counts=[products.filter(p=>situation(p)==="normal").length,products.filter(p=>situation(p)==="low").length,products.filter(p=>situation(p)==="zero").length];
 stockChart=new Chart($("stockChart"),{type:"doughnut",data:{labels:["Normal","Baixo","Zerado"],datasets:[{data:counts,backgroundColor:["#20a77d","#e1a34d","#df6672"],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:"72%",plugins:{legend:{display:false}}}});
}
function fillSelects(){
 $("productSupplier").innerHTML='<option value="">Não informado</option>'+suppliers.map(s=>`<option value="${s.id}">${safe(s.name)}</option>`).join("");
 $("movementProduct").innerHTML=products.map(p=>`<option value="${p.id}">${safe(p.name)} (saldo: ${p.quantity})</option>`).join("");
}
function open(id){$(id).classList.add("open");}function close(id){$(id).classList.remove("open");}
$("addProductTop").addEventListener("click",()=>open("productModal"));$("addProductBtn").addEventListener("click",()=>open("productModal"));
$("newMovementBtn").addEventListener("click",()=>open("movementModal"));$("newSupplierBtn").addEventListener("click",()=>open("supplierModal"));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>close(b.dataset.close)));
document.querySelectorAll(".backdrop").forEach(b=>b.addEventListener("click",e=>{if(e.target===b)close(b.id);}));
$("productSearch").addEventListener("input",renderProducts);
$("productForm").addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(e.target),p={name:f.get("name").trim(),category:f.get("category").trim(),sku:f.get("sku").trim(),quantity:Number(f.get("quantity")),minimumStock:Number(f.get("minimumStock")),price:Number(f.get("price")),supplierId:f.get("supplierId")?Number(f.get("supplierId")):null};
 try{if(DEMO_MODE){if(products.some(x=>x.sku.toLowerCase()===p.sku.toLowerCase()))throw Error("Já existe um produto com esse SKU.");p.id=Date.now();products.push(p);save();}else await api("/products",{method:"POST",body:JSON.stringify(p)});e.target.reset();close("productModal");await reload();}
 catch(err){$("productMessage").textContent=err.message;}
});
$("movementForm").addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(e.target),m={productId:Number(f.get("productId")),type:f.get("type"),quantity:Number(f.get("quantity")),note:f.get("note").trim()};
 try{if(DEMO_MODE){const p=product(m.productId);if(!p)throw Error("Produto não encontrado.");if(m.type==="OUT"&&m.quantity>p.quantity)throw Error("Quantidade maior que o saldo disponível.");p.quantity+=m.type==="IN"?m.quantity:-m.quantity;m.id=Date.now();m.date=new Date().toISOString();movements.push(m);save();}else await api("/movements",{method:"POST",body:JSON.stringify(m)});e.target.reset();close("movementModal");await reload();}
 catch(err){$("movementMessage").textContent=err.message;}
});
$("supplierForm").addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(e.target),s={name:f.get("name").trim(),email:f.get("email").trim(),phone:f.get("phone").trim()};
 try{if(DEMO_MODE){s.id=Date.now();suppliers.push(s);save();}else await api("/suppliers",{method:"POST",body:JSON.stringify(s)});e.target.reset();close("supplierModal");await reload();}
 catch(err){$("supplierMessage").textContent=err.message;}
});
document.addEventListener("click",e=>{const b=e.target.closest("[data-quick-move]");if(b){open("movementModal");$("movementProduct").value=b.dataset.quickMove;}});
async function reload(){if(!DEMO_MODE){try{[products,suppliers,movements]=await Promise.all([api("/products"),api("/suppliers"),api("/movements")]);}catch(e){alert(e.message);return;}}render();}
seed();reload();

// Para conectar ao Spring Boot, inicie o backend e altere DEMO_MODE para false.
