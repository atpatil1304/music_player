const play=document.getElementById('play');
const music=document.querySelector('audio');
const image=document.querySelector('img');
const prev =document.getElementById('prev');
const next =document.getElementById('next');
const musicName=document.getElementById('musicName');
const artistName = document.getElementById('artistName');
let progress=document.getElementById('progress');
let current_time=document.getElementById("current_time");
let total_duration =document.getElementById("duration");
let progress_div =document.getElementById("progress_div");
const songs=[
        {
            title:"Dil meri na Sune",
            artist:"A R Rahman",
            image:"img1",
            song:"song1"
        },
        {
            title:"Lakho mile ",
            artist:"Argit Singh",
            image:"img2",
            song:"song2"

        },
        {
            title:"Khanderaya",
            artist:"Adarsh shinde",
            image:"img3",
            song:"song3"

        },
        {
            title:"Mitwa",
            artist:"A R Rahman",
            image:"img4",
            song:"song4"

        },
        {
            title:"Lehra do",
            artist:"Pritam,Argit singh",
            image:"img5",
            song:"song5"

        }
    ]
isplaying= false
const musicPlay=()=>{
    isplaying=true
    music.play();
    image.classList.add('anime');
    play.classList.replace('fa-play','fa-pause')
}

const musicPause=()=>{
    isplaying=false;
    music.pause();
    image.classList.remove('anime');
    play.classList.replace('fa-pause','fa-play')
}

play.addEventListener('click',()=>{

    isplaying ? musicPause():musicPlay();   

})

//load music data
const loadSong=(song)=>{
    musicName.textContent=song.title;
    artistName.textContent=song.artist;
    image.src=`images/${song.image}.jpeg`;
    music.src=`songs/${song.song}.mp3`
}

// loadSong(songs[3])

songIndex=0;
const nextSong =()=>{
    songIndex=(songIndex+1) % songs.length
    loadSong(songs[songIndex])
    musicPlay()
}
const prevSong =()=>{
    songIndex=(songIndex-1 +songs.length)%songs.length
    loadSong(songs[songIndex])
    musicPlay()
}

//progress work..
music.addEventListener('timeupdate',(event)=>{
    // console.log(event);
    const {currentTime,duration}=event.srcElement;
    // console.log("current time is :",currentTime);
    // console.log("duration is :",duration)

    progress_time=(currentTime/duration)*100
    progress.style.width=`${progress_time}%`

    //update duration of each song

    let min_duration = Math.floor(duration/60)     //it will give minitute 
    let sec_duration = Math.floor(duration % 60)   // it will give second

    if(sec_duration<10){
        sec_duration=`0${sec_duration}`
    }
    let t_duration=`${min_duration}:${sec_duration}`

    if(duration){
        total_duration.textContent= `${t_duration}`
    }

    //update current time of each song

    let min_currentTime =Math.floor(currentTime/60)
    let sec_currentTime= Math.floor(currentTime%60)
    if(sec_currentTime < 10){
        sec_currentTime=`0${sec_currentTime}`
    }
    let t_currentTime=`${min_currentTime}:${sec_currentTime}`

    current_time.textContent=`${t_currentTime}`

    // music start from where we click on current progressbar
    progress_div.addEventListener('click',(event)=>{
        console.log(event)
        const {duration} =music

        let move_progress =(event.offsetX /event.srcElement.clientWidth)*duration

        music.currentTime=move_progress;

    })

    // play next song while completion of first song
    if(duration==currentTime){
        nextSong()
    }

})



next.addEventListener('click',nextSong)
prev.addEventListener('click',prevSong)
