const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp_real_val');
const datahide = document.querySelector('.middle_layer');
const today_Date = document.getElementById('today_Date');
const day = document.getElementById('day');

///----------------------------------------
//Date time day
const getDay = () => {
    var weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thrusday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
    let currentDay = new Date();
    const dayweek = weekDay[currentDay.getDay()];
    console.log(dayweek);
    return dayweek;
}
const getCurrentMonth = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    console.log(date);
    console.log(month);
    return `${date}   ${month}`;
}
getDay();
getCurrentMonth();
day.innerText = getDay();
today_Date.innerText = getCurrentMonth();
//----------------------------------------------------------------

const getInfo = async (event) => {
    event.preventDefault();
    let cityval = cityName.value;
    console.log(cityval);

    if (cityval == "") {
        city_name.innerText = `Please write the name before search`;
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=a5bd38e05c241e9ecf5ef8c9f6fa7979`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            console.log(data);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68'></i>";
            }
            else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6'></i>";
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be'></i>";
            }
            else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6'></i>";
            }
            datahide.classList.remove('data_hide');

        } catch {
            city_name.innerText = `Please enter the city name properly`;
            datahide.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click', getInfo)