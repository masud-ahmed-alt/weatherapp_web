
$(document).ready(() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude
            var long = position.coords.longitude
            // console.log("Lattitute : " + lat + "\n" + "longitute : " + long);

            $.ajax({
                url: 'locapicall.php',
                method: 'POST',
                data: { lat, long },
                success: (data, status) => {
                    updateUI(data)
                }
            })

        });
    } else {
        $('#feel_temp').html("Browser doesn't support geolocation! \n Search Your Location!")
    }

    $('#btn-city').click(() => {
        var city = $('#city').val()
        if (city == '') {
            console.log('City Empty');
        } else {
            $.ajax({
                url: 'apicall.php',
                method: 'POST',
                data: { city },
                success: (data, status) => {
                    updateUI(data)
                }
            })
        }
    })

    function updateUI(data) {
        if (data.length < 100) {
            $('#warn_search').html("No matching location found.")
        } else {
            $('#warn_search').html("")
            var value = $.parseJSON(data)
            $('#c_name').html(value['location']['name'] + ' , ' + value['location']['region'] + ' , ' + value['location']['country'])
            // Last Update Time date 
            var l_updt = value['current']['last_updated']
            var d = new Date(l_updt);
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var date = d.getDate() + " " + month[d.getMonth()] + ", " + d.getFullYear();
            var time = d.toLocaleTimeString().toLowerCase();
            l_updt = (date + " at " + time);
            $('#date').html('Last Update : ' + l_updt)



            $('#temp').html(value['current']['temp_c'] + '°C')
            $('#feel_temp').html("Feels Like: " + value['current']['feelslike_c'] + '°C')
            $('#w_condition').html(value['current']['condition']['text'])


            $('#wind').html("Wind: " + value['current']['wind_kph'] + " KMP")
            $('#humidity').html("Humidity: " + value['current']['humidity'] + " %")
            $('#uv').html("UV Index: " + value['current']['uv'] + "/10")
            // $('#').html("Air Quality: "+value['current']['uv']+"/10")


            var winDir = value['current']['wind_dir']
            console.log("Win Dir : " + winDir);
            if (winDir == 'E')
                $('#wind_dir').html("Wind Dir: East")
            else if (winDir == 'W')
                $('#wind_dir').html("Wind Dir: West")
            else if (winDir == 'S')
                $('#wind_dir').html("Wind Dir: South")
            else if (winDir == 'N')
                $('#wind_dir').html("Wind Dir: North")
            else if (winDir == 'SSW')
                $('#wind_dir').html("Wind Dir: South West")
            else
                $('#wind_dir').html("Win Dir: "+winDir)


            $('#image').html(`<img src="${value['current']['condition']['icon']}" alt="Error">`)

            // Local Time 
            var l_time = value['location']['localtime']
            var d = new Date(l_time);
            var time = d.toLocaleTimeString().toLowerCase();
            $('#time').html(time)



            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const td = new Date();
            let day = weekday[td.getDay()];
            $('#day').html(day)
        }
    }
})

