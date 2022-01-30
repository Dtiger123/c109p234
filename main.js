var model = "https://teachablemachine.withgoogle.com/models/0D78oun5M/model.json";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90  
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'/>";
    })
}
classifier=ml5.imageClassifier(model,modelloaded);
function modelloaded(){
    console.log("model has be initialized");
}
var prediction1="";
var prediction2="";
function speak(){
    var synth = window.speechSynthesis;
    speakdata1 = "the first prediction is"+prediction1;
    speakdata2 = "the second prediction is"+prediction2;
    var utterthis = new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis)
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresults);
}
function gotresults (error,results){
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("emoji_name1").innerHTML = results[0].label;
        document.getElementById("emoji_name2").innerHTML = results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;

        if (prediction1=="happy"){
            document.getElementById("emotion_name1").innerHTML = "&#128522";
        }
        if (prediction1=="sad"){
            document.getElementById("emotion_name1").innerHTML = "&#128532";
        }
        if (prediction1=="angry"){
            document.getElementById("emotion_name1").innerHTML = "&#128548";
        }
        if (prediction2=="happy"){
            document.getElementById("emotion_name2").innerHTML = "&#128522";
        }
        if (prediction2=="sad"){
            document.getElementById("emotion_name2").innerHTML = "&#128532";
        }
        if (prediction2=="angry"){
            document.getElementById("emotion_name2").innerHTML = "&#128548";
        }
    }
}