let c=document.getElementById("my-canvas");
let ctx= c.getContext("2d");

let loadImage= (src, callback)=>{
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src=src;
};

let imagepath= (framenumber,animation) => {
    return animation+"/"+framenumber+".png";
};

let frames={
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],
}


let loadImages=(callback) => {
    let images={idle:[],kick:[],punch:[]};
    let imagesToLoad=0;

    ["idle","kick","punch"].forEach((animation)=>{
        let animationFrames=frames[animation];
        imagesToLoad=imagesToLoad+animationFrames.length;
       
        animationFrames.forEach((framenumber)=>{
            let path=imagepath(framenumber,animation);
            loadImage(path,(image)=>{
                images[animation][framenumber-1]=image;
                imagesToLoad=imagesToLoad-1;
    
                if(imagesToLoad===0)
                {
                    callback(images);
                }
            });
        });
        
    });
};

let animate=(ctx,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        }, index*100);
    });
    setTimeout(callback, images[animation].length*100);
};


loadImages((images)=>{
    let queuedAnimation=[];
    let aux=()=>{
        let selectedAnimation;

        if(queuedAnimation.length===0){
            selectedAnimation="idle";
        }
        else{
            selectedAnimation=queuedAnimation.shift();
        }
        animate(ctx,images,selectedAnimation,aux);
    };
    aux();

    document.getElementById('kick').onclick=() =>{
        queuedAnimation.push("kick");
    };

    document.getElementById('punch').onclick=() =>{
        queuedAnimation.push("punch");
    };

    document.addEventListener("keyup", (event)=>{
        const key = event.key;

        if(key==="ArrowLeft"){
            queuedAnimation.push("kick");
        }
        else if(key==="ArrowRight"){
            queuedAnimation.push("punch");
        }
    });

    });

   



// loadImages((images)=>{
//     let selectedAnimation='idle';
//     let aux=()=>{
//         animate(ctx,images,selectedAnimation,aux);
//     };
//     aux();

//     document.getElementById('kick').onclick=() =>{
//         selectedAnimation="kick";
//     };

//     document.getElementById('punch').onclick=() =>{
//         selectedAnimation="punch";
//     };

//     });




// loadImages((images)=>{
//     // ctx.drawImage(images[3],0,0,500,500);
//     animate(ctx,images,"kick",()=>{
//         console.log("Done!");
//     });
// });

// loadImage("idle.png", (img)=>{
//     ctx.drawImage(img,0,0,500,500);
// })

// let img = document.createElement('img');


// img.onload = ()=>{
//     ctx.drawImage(img,0,0,500,500);
// };
// img.src="idle.png";

