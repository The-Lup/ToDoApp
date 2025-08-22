(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const p=`<section class="todoapp">\r
  <header class="header">\r
    <h1>Todo List</h1>\r
    <!-- Input for adding new todos -->\r
    <input\r
      id="new-todo-input"\r
      class="new-todo"\r
      type="text"\r
      placeholder="What needs to be done?"\r
      autofocus\r
    />\r
  </header>\r
\r
  <section class="main">\r
    <!-- Checkbox to mark all todos as complete -->\r
    <input id="toggle-all" class="toggle-all" type="checkbox" />\r
    <label for="toggle-all">Mark all as complete</label>\r
\r
    <!-- List of todos -->\r
    <ul class="todo-list"></ul>\r
  </section>\r
\r
  <footer class="footer">\r
    <!-- Pending todos counter -->\r
    <span id="pending-count">0 items left</span>\r
\r
    <!-- Filters: All, Active, Completed -->\r
    <div class="filters">\r
      <a href="#/" class="selected">All</a>\r
      <a href="#/active">Active</a>\r
      <a href="#/completed">Completed</a>\r
    </div>\r
\r
    <!-- Button to clear completed todos -->\r
    <button id="clear-completed" class="clear-completed">\r
      Clear Completed\r
    </button>\r
  </footer>\r
</section>\r
`,d={todos:[],filter:"all",initStore(){this.todos=[],this.filter="all"},addTodo(t){this.todos.push({id:Date.now(),description:t,done:!1})},toggleAll(t){this.todos.forEach(o=>o.done=t)},clearCompleted(){this.todos=this.todos.filter(t=>!t.done)},setFilter(t){this.filter=t},getTodos(){switch(this.filter){case"active":return this.todos.filter(t=>!t.done);case"completed":return this.todos.filter(t=>t.done);default:return this.todos}},getPendingCount(){return this.todos.filter(t=>!t.done).length},toggleTodo(t){const o=this.todos.find(r=>r.id===t);o&&(o.done=!o.done)},deleteTodo(t){this.todos=this.todos.filter(o=>o.id!==t)}};let i;const a=t=>{if(i||(i=document.querySelector(t)),!i)throw new Error(`Element ${t} not found`);const o=d.getTodos();i.innerHTML="",o.forEach(r=>{const l=document.createElement("li");l.className=r.done?"completed":"";const e=document.createElement("input");e.type="checkbox",e.checked=r.done,e.addEventListener("change",()=>{d.toggleTodo(r.id),a(t)});const n=document.createElement("span");n.innerText=r.description;const s=document.createElement("button");s.innerText="✕",s.className="destroy",s.addEventListener("click",()=>{d.deleteTodo(r.id),a(t)}),l.appendChild(e),l.appendChild(n),l.appendChild(s),i.appendChild(l)})};let c;const f=t=>{if(c||(c=document.querySelector(t)),!c)throw new Error(`Element ${t} not found`);c.innerText=d.getPendingCount()};class h{constructor(o){this.root=document.getElementById(o)}init(){this.root.innerHTML=p,d.initStore(),this.refreshUI(),this.addEventListeners()}refreshUI(){a(".todo-list"),f("#pending-count")}addEventListeners(){document.querySelector("#new-todo-input").addEventListener("keyup",e=>{e.key==="Enter"&&e.target.value.trim().length>0&&(d.addTodo(e.target.value),e.target.value="",this.refreshUI())});const r=document.querySelector("#toggle-all");r.addEventListener("change",()=>{d.toggleAll(r.checked),this.refreshUI()}),document.querySelector(".clear-completed").addEventListener("click",()=>{d.clearCompleted(),this.refreshUI()}),document.querySelectorAll(".filters a").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),document.querySelectorAll(".filters a").forEach(u=>u.classList.remove("selected")),e.classList.add("selected");const s=e.getAttribute("href").replace("#/","");d.setFilter(s),this.refreshUI()})})}}const m=new h("app");m.init();
