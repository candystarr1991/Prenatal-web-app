let date = new Date();
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();
let nameOfMonth = date.toLocaleString('en-US', { month: 'long' });
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today = date.toLocaleDateString('en-US',options)

function getNumberOfDays (year, month) {
	return new Date(year, month+1, 0).getDate()
}
function daysIntoYear(date){
	return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

let thisMonthsNumberOfDays = getNumberOfDays(year, month)
// year progress
let yearProgress = Math.floor(daysIntoYear(date) / 365 * 100)

// Changing Value within DOM
document.getElementById('activeDate').textContent =  `${today}`
document.getElementById('year-progress').style = `width: ${yearProgress}%`
document.getElementById('year-progress').textContent = `${yearProgress}%`
document.getElementById('remainingDay').textContent = `${365 - daysIntoYear(date)}`
document.getElementById('moodBlock-month').textContent = nameOfMonth

// Generate random number between min and max
function random(min, max) {  
	return Math.floor(Math.random() * (max - min + 1) + min);
}
// Return st,nd,rd, or th after a number
function ord(n) {
	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}


// JOURNALS
let journals = [
	{	
		date: '22/01',
		title: 'First Trimester',
		mood: 'Great',
		content: ``
	},
]

// Create journal inside journal card
let newJournalDate = document.getElementById('newjournal-inputDate')
newJournalDate.textContent = `${day}/${month}, `+year
function createJournal(date,title,content){
	let journalRow = document.createElement('div')
	journalRow.className = 'row'

	let journalDate = document.createElement('b')
	journalDate.className = 'col-sm-2'
	journalDate.textContent = date

	let journal = document.createElement('div')
	journal.className = 'col-md-10'

	let journalRowTitle = document.createElement('h5')
	journalRowTitle.className = 'journalRow-title'
	journalRowTitle.textContent = title

	let journalRowContent = document.createElement('p')
	journalRowContent.className = 'journalRow-content'
	journalRowContent.textContent = content

	let separator = document.createElement('hr')
	separator.className = 'my-3'

	journal.appendChild(journalRowTitle)
	journal.appendChild(journalRowContent)
	journal.appendChild(separator)

	journalRow.appendChild(journalDate)
	journalRow.appendChild(journal)
	
	// create card
	journalCard.appendChild(journalRow)
}

// create initial card based on journals array
let journalCard = document.getElementById('journal-card')
for(let i = 0; i < journals.length; i++){
	createJournal(journals[i].date, journals[i].title, journals[i].content)
}

let formNewJournal = document.getElementById('form-newJournal');
formNewJournal.addEventListener('submit',addNewJournal);

function addNewJournal(e){
	e.preventDefault()

	let title = document.getElementById('input-title').value;
	let content = document.getElementById('input-journal').value;
	let tanggal = `${day}/${month}`

	// added and then reset / clear form
	createJournal(tanggal,title,content)
	title = document.getElementById('input-title').value = '';
	content = document.getElementById('input-journal').value = '';
	
	}

// Cycle through MoodsBlocks
gridCycler = document.querySelectorAll('.grid-item')
for(let i=0; i<gridCycler.length; i++){
	gridCycler[i].addEventListener('click', function() {
		if(gridCycler[i].classList[1] === 'moodType-1'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-2')
		} else if(gridCycler[i].classList[1] === 'moodType-2'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-3')
		} else if(gridCycler[i].classList[1] === 'moodType-3'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-4')
		} else if(gridCycler[i].classList[1] === 'moodType-4'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-5')
		} else if(gridCycler[i].classList[1] === 'moodType-5'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-1')
		} else {
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-3')
		}
		console.log(gridCycler[i].classList[1])
	});
}


var $els = $('.menu a, .menu header');
var count = $els.length;
var grouplength = Math.ceil(count/3);
var groupNumber = 0;
var i = 1;
$('.menu').css('--count',count+'');
$els.each(function(j){
    if ( i > grouplength ) {
        groupNumber++;
        i=1;
    }
    $(this).attr('data-group',groupNumber);
    i++;
});

$('.menu footer button').on('click',function(e){
    e.preventDefault();
    $els.each(function(j){
        $(this).css('--top',$(this)[0].getBoundingClientRect().top + ($(this).attr('data-group') * -15) - 20);
        $(this).css('--delay-in',j*.1+'s');
        $(this).css('--delay-out',(count-j)*.1+'s');
    });
    $('.menu').toggleClass('closed');
    e.stopPropagation();
});

// run animation once at beginning for demo
setTimeout(function(){
    $('.menu footer button').click();
    setTimeout(function(){
        $('.menu footer button').click();
    }, (count * 100) + 500 );
}, 1000);

    