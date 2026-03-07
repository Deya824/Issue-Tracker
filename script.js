const CardContainer=document.getElementById("issuesContainer");
const allCard=document.getElementById("all");
const openCard=document.getElementById("open");
const closeCard=document.getElementById("close");
const CardAll=document.getElementById("all-btn");
let getIssues=document.getElementById("issues");
const Searchbtn=document.getElementById("btnSearch");
const inputS=document.getElementById("search");
const spinner=document.getElementById("spinner");
function Addspin(){
    CardContainer.classList.add("hidden");
    spinner.classList.remove("hidden");
}
function Removespin(){
    spinner.classList.add("hidden");
     CardContainer.classList.remove("hidden");
}
Searchbtn.addEventListener ('click',async()=>{
    
    const val=inputS.value;
     if (!val) return;
    Addspin();
const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${val}`);
const Ndata=await res.json();
CardContainer.innerHTML="";
getIssues.innerText=Ndata.data.length;

if(Ndata.data.length=== 0){
    Removespin();
    CardContainer="";
    
}
else{
Removespin();
disPlayCard(Ndata.data);}

})

CardAll.addEventListener('click', (e) => {
  
    const clickedBtn = e.target.closest(".allbtn");
    if (!clickedBtn) return;

    // Button styling logic
    const allbtnClass = document.querySelectorAll(".allbtn");
    allbtnClass.forEach((btn) => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });
    clickedBtn.classList.remove("btn-outline");
    clickedBtn.classList.add("btn-primary");

    // Fetch and Filter Logic
    Addspin();
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(result => {
            const data = result.data; 

            
            CardContainer.innerHTML = ""; 

            if (clickedBtn === allCard) {
              
                getIssues.innerText=data.length;
                Removespin();
                disPlayCard(data);
            } 
            else if (clickedBtn === openCard) {
              
                const opendata = data.filter(item => item.status === "open");
                getIssues.innerText=opendata.length;
                Removespin();
                disPlayCard(opendata);
            } 
            else if (clickedBtn === closeCard) {
             
                const closedata = data.filter(item => item.status === "closed");
                getIssues.innerText=closedata.length;
                Removespin();
                disPlayCard(closedata);
            }
        });
});

const LoadCard=async()=>{
    Addspin();
    const res= await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data=await res.json();
    Removespin();
    disPlayCard(data.data);

}
// "data": [
//     {
//       "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ]
LoadCard();
const disPlayCard = (cards) => {
    // CardContainer.innerHTML = ""; // Uncomment this to clear previous data
    
    cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "h-full"; // Crucial for grid height
        div.onclick = () => showModal(card);
        const isOpen = card.status === 'open';

        div.innerHTML = `
        <div class="card bg-base-100 shadow-sm flex-grow border-t-4 ${isOpen ? 'border-t-green-600' : 'border-t-purple-800'} max-w-sm h-full flex flex-col">

          <div class="card-body flex-grow"> <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <img src="${isOpen ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" class="w-5" id="statusIcon">
              </div>
              <div class="badge badge-soft badge-secondary w-18 text-pink-500 bg-pink-50">${card.priority.toUpperCase()}</div>
            </div>

            <h2 class="card-title text-base font-bold line-clamp-2 min-h-[3rem]" id="issueTitle">
              ${card.title}
            </h2>
            <div class="flex-grow mt-auto">
            <p class="text-sm opacity-70 line-clamp-2 " id="issueDescription">
              ${card.description}
            </p>
            </div>

          <div class="flex flex-wrap gap-2 mt-auto pt-4" id="issueTags"> ${card.labels.map((label, index) => {
                const labelClass = index === 0 ? 'badge-error' : 'badge-warning';
                return `<div class="badge badge-outline ${labelClass} uppercase text-[10px] font-bold">
                  ${label}
                </div>`;
              }).join('')}
            </div>

          </div>

          <div class="border-t border-gray-200"></div>

          <div class="px-6 py-4 text-xs opacity-60 flex justify-between">
          <div>
            <p id="issueAuthor" class="font-medium text-gray-700">#${card.id} by ${card.author}</p>
             <p id="issueAuthor" class="font-medium text-gray-700">Assignee ${card.assignee}</p>
            
          </div>
          <div>
            <p id="issueDate">${new Date(card.createdAt).toLocaleDateString()}</p>
           
            <p id="issueDate">Updated: ${new Date(card.updatedAt).toLocaleDateString()}</p>
          </div>
          </div>

        </div>
        `;
        CardContainer.append(div);
    });
}

const showModal = async (card) => {
  const modal = document.getElementById('issue_modal');
  const content = document.getElementById('modal-content');

  
    
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${card.id}`);
    const result = await res.json();
    const issue = result.data;

    const isOpen = issue.status.toLowerCase() === 'open';
    const statusText = isOpen ? 'Opened' : 'Closed';
    
    
    const statusClass = isOpen 
      ? 'bg-[#00A96E] text-white' 
      : 'bg-[#A855F7] text-white';
    const formattedDate = new Date(issue.createdAt).toLocaleDateString('en-GB');

    content.innerHTML = `
      <h3 class="text-3xl font-bold text-[#1F2937] mb-4">${issue.title}</h3>
      
      <div class="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <span class="badge ${statusClass} gap-1 text-white font-medium py-3 px-4 rounded-lg">
          <span class="w-2 h-2 bg-white rounded-full"></span> 
          ${statusText}
        </span>
        <span>•</span>
        <span>Opened by <span class="font-semibold text-gray-700">${issue.author}</span></span>
        <span>•</span>
        <span>${formattedDate}</span>
      </div>

      <div class="flex gap-3 mb-8">
         ${issue.labels.map((label, index) => {
            const isBug = label.toLowerCase() === 'bug';
            const style = isBug ? 'bg-red-50 text-red-500 border-red-100' : 'bg-orange-50 text-orange-500 border-orange-100';
            const icon = isBug ? '<i class="fa-solid fa-bug"></i>' : '<i class="fa-solid fa-globe"></i>';
            
            return `
              <span class="border ${style} px-3 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-2">
                ${icon} ${label}
              </span>`;
         }).join('')}
      </div>

      <p class="text-gray-500 leading-relaxed mb-8 text-lg">
        ${issue.description}
      </p>

      <div class="bg-[#F8FAFC] rounded-2xl p-6 grid grid-cols-2 gap-4">
        <div>
          <p class="text-gray-400 text-sm mb-1">Assignee:</p>
          <p class="font-bold text-[#1F2937] text-lg">${issue.assignee || 'Unassigned'}</p>
        </div>
        <div>
          <p class="text-gray-400 text-sm mb-1">Priority:</p>
          <span class="bg-[#F87171] text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
            ${issue.priority}
          </span>
        </div>
      </div>
    `;

    modal.showModal();
   
};