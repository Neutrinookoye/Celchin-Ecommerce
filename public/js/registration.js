"use strict"
import {validateName , validateEmail , validateFullName , 
     validateMobile , validatePassword ,
     validateUserName ,  verifyPassword} from "./validate.js" 
import {selector , selectAll , createElement , sendData , getData } from "./api.js"  

let toggler = selector("#navbar-toggler") 
if (toggler){ 
    try { 
        // Opening mobile search 
        let searchTrigger = selector(".nav-search")
        let searchBox = selector(".mobile-search")
        let stickySidebar = selector(".sticky") 
        let smallClose = selector(".small-close")
        searchTrigger.addEventListener("click" , e => {
            searchBox.classList.toggle("d-active-sm")
            searchBox.nextElementSibling.classList.toggle("after-fixed-elem")
        })
        // Opening the sidebar 
        let stickyClass = stickySidebar.classList
        toggler.addEventListener("click" , e => { 
            selector(".main").classList.toggle("main-now")
        stickyClass.toggle("sticky") 
        stickyClass.remove("bg-dark-light")
        stickySidebar.setAttribute("class" , "fixam from-left")
        })
        if (smallClose){ 
            smallClose.addEventListener("click" , e => {
                stickySidebar.setAttribute("class" , "comot")
                setTimeout(() => {
                    stickySidebar.classList.toggle("sticky")
                } , 100)
            }) 
        }
    }catch(error){
        console.error(error.message)
    }
} 
const NigerianStates = [
    {
        name : "Abia" ,
        province : [
            "Aba North" , "Aba South" , "Arochukwu" , "Bende" , 
            "Ikwuano" , "Isiala Ngwa North" , "Isiala Ngwa South" , 
            "Isuikwuato" , "Obi Ngwa" , "Ohafia" , "Osisioma Ngwa" , 
            "Ugwunagbo" , "Ukwa East" , "Ukwa West" , "Umuahia North" , 
            "Umuahia South"
        ]
    }  , 
    {
        name : "Imo" , 
        province : [
            "Aboh Mbaise" , "Ahiazu Mbaise" , "Awo-Omamma" , "Ehime Mbano" , 
            "Ezinihitte Mbaise" , "Ideato North" , "Ideato South" , "Ihitte/Uboma" , 
            "Ikeduru" , "Isiala Mbano" , "Isu, Nigeria" , "Izombe" , "Mbaitoli" ,
            "Mgbidi" , "Ngor Okpala" , "Njaba" , "Nkwerre" , "Nwangele" , "Obowo" , 
            "Oguta", "Ohaji/Egbema" , "Okigwe" , "Onuimo" , "Orlu, Imo" , "Orsu" , 
            "Oru East" , "Oru West" , "Owerri Municipal" , "Owerri North" , "Owerri West" , 
            "Umuaka"
        ]
    } , 
    {
        name : "Anambra" , 
        province : [
            "Aguata" , "Anambra East" , "Anambra West" , "Anaocha" , "Awka North",
            "Awka South",  "Ayamelum" , "Dunukofia" , "Ekwusigo" , "Idemili North" , 
            "Idemili South" , "Ihiala" , "Njikoka" , "Nnewi North" , "Nnewi South" , 
            "Ogbaru" , "Onitsha North " , "Onitsha South " , "Orumba North" , 
            "Orumba South" , "Oyi" 
        ]
    } , 
    {
        name : "Enugu" , 
        province : [
            "Aninri" , "Awgu" , "Enugu East" , "Enugu North" , "Enugu South" , 
            "Ezeagu" , "Igbo Etiti" , "Igbo Eze North" , "Igbo Eze South" , 
            "Isi Uzo" , "Nkanu East" , "Nkanu West" , "Nsukka" , "Oji River" , 
            "Udenu" , "Udi" , "Uzo-Uwani"
        ]
    } , 
    {
        name : "Ebonyi" , 
        province : [
            "Abakaliki" , "Afikpo North" , "Afikpo South" , "Ebonyi", "Ezza North" , 
            "Ohaozara" , "Ohaukwu" , "Onicha"
        ]
    } , 
    {
        name : "Ogun" , 
        province : [
            "Abeokuta North" , "Abeokuta South" , "Ado-Odo/Ota" , "Ewekoro" , 
            "Ifo" , "Ijebu East" , "Ijebu North" , "Ijebu North East" , "Ijebu Ode" , 
            "Ikenne" , "Imeko Afon" , "Ipokia" , "Obafemi Owode" , "Odogbolu" , "Odeda" , 
            "Ogun Waterside" , "Remo North" , "Sagamu" , "Yewa North" , "Yewa South" 
        ]
    } , 

    { 
        name : "Lagos" , 
        province: [
            "Agege" ,"Ajeromi/Ifelodun" ,  "Alimosho" , "Amuwo-Odofin" , 
            "Apapa" , "Badagry" , "Epe" , "Eti-Osa" , "Ibeju-Lekki" , 
            "Ifako-Ijaye" , "Ikeja" , "Ikorodu" , "Kosofe" , "Lagos Island" , 
            "Lagos Mainland" , "Mushin" , "Oshodi/Isolo" , "Somolu" , "Surulere"		
        ] ,
    } , 
    {
        name : "Ondo" , 
        province : [
            "Akoko North-East " , "Akoko North-West" , "Akoko South-East " , "Akoko South-West" , 
            "Akure North " , "Akure South " , "Ese Odo " , "Idanre " , "Ifedore " , "Ilaje " , 
            "Ile Oluji/Okeigbo " , "Irele " , "Odigbo " , "Okitipupa " , "Ondo East " , 
            "Ondo West" , "Ose" ,"Owo"
        ]
    } , 
    {
        name : "Osun" , 
        province : [
            "Aiyedaade" ,"Aiyedire" , 	"Atakunmosa" ,   "Boluwaduro" , "Boripe" , 	
            "Ede North" , "Ede South" , "Egbedore" , "Ejigbo" , "Ife Central" , 	
            "Ife East" , "Ife North" , 	"Ife South" , 	"Ifedayo" , "Ifelodun" , "Ila" , 
            "Ilesa East" , 	"Ilesa West" , "Irepodun" , "Irewole" , "Isokan" , "Iwo" , 
            "Obokun" , 	"Odo Otin" , "Ola Oluwa" , 	"Olorunda" , "Oriade" , "Orolu" , 	
            "Osogbo"
        ]
    } , 
    {
        name : "Ekiti" , 
        province : [
            "Ado-Ekiti" , "Ikere" , "Oye" , "Aiyekire " , "Efon" , "Ekiti East" , 
            "Ekiti South-West" , "Ekiti West" , "Emure" , "Ido-Osi" , "Ijero" , "Ikole" , 
            "Ilejemeje" , "Irepodun/Ifelodun" , "Ise/Orun" , "Moba"
        ]
    } , 
    {
        name : "Akwa Ibom" , 
        province : [
            "Abak" , "Eastern Obolo" , "Eket" , "Esit Eket" , "Essien Udim" , 
            "Etim Ekpo" , "Etinan" , "Ibeno" , "Ibesikpo Asutan" , 
            "Ibiono-Ibom" , "Ika " , "Ikono" , "Ikot Ekpene" , "Ikot-Abasi" , 
            "Ini" , "Itu" ,"Mbo" , "Mkpat-Enin" , "Nsit-Atai" , "Nsit-Ibom" , 
            "Nsit-Ubium" , "Obot-Akara" , "Okobo" , "Onna" , "Oron"  , "Oruk Anam" , 
            "Udung-Uko" , "Ukanafun" , "Uruan" , "Urue-Offong/Oruko" , "Uyo"
        ]
    } , 
    {
        name : "Delta" , 
        province : [
            "Aniocha North" , "Aniocha South" , "Bomadi" , "Burutu" , 
            "Ethiope East" , "Ethiope West" , "Ika North East" , 
            "Ika South" , "Isoko North" , "Isoko South" , "Ndokwa East" , 
            "Ndokwa West" , "Oshimili North" , "Oshimili South" , 
            "Patani" , "Sapele"
        ] 
    } , 
    {
        name : "Edo" , 
        province : [
            "Akoko-Edo" ,"Egor" , "Esan Central" , "Esan North-East" , 
            "Esan South-East" , "Esan West" , "Etsako Central" , "Etsako East" ,
            "Etsako West" , "Igueben" , "Ikpoba-Okha" , "Oredo" , 
            "Orhionmwon" , "Ovia North-East" , "Ovia South-West" , "Owan East" ,
            "Owan West" , "Uhunmwonde" 
        ]  
    } , 
    {
        name : "Bayelsa" ,
        province : [
            "Brass" , "Ekeremor" , "Kolokuma/Opokuma" , "Nembe" , 
            "Ogbia" , "Sagbama" ,  "Sounthern Ijaw" , "Yenagoa"
        ] 
    } , 
    {
        name : "Kogi" , 
        province : [
            "Adavi" , "Ajaokuta" , "Ankpa" , "Bassa" , 
            "Dekina" , "Ibaji" , "Idah" , "Igalamela-Odolu" , 
            "Ijumu" , "Kabba/Bunu" , "Koton Karfe" , "Lokoja" ,
            "Mopa-Muro" , "Ofu" , "Ogori/Magongo" , "Okehi" , 
            "Okene" , "Olamaboro" , "Omala" , "Yagba East" ,
            "Yagba West" 
        ]
    } , 
    {
        name : "Benue" , 
        province : [
            "Ado" , "Agatu" , "Apa" , "Buruku" , 
            "Gboko" , "Guma" , "Gwer East" , "Gwer West" ,
            "Kastina Ala" , "Konshisha" , "Kwande" , "Logo" ,
            "Makurdi" , "Obi" , "Ogbadibo" , "Ohimini" ,
            "Oju" , "Okpokwu" , "Otukpo" , "Tarka" , 
            "Ukum" , "Ushongo" , "Vandeikya"
        ]
    } , 
    {
        name : "Kwara" , 
        province : [
            "Asa" , "Baruten" , "Edu" , "Ekiti" , 
            "Ifelodun" , "Ilorin East" , "Ilorin South" , "Ilorin West" ,
            "Irepodun" , "Isin" , "Kaiama" , "Moro" ,
            "Offa" , "Oke Ero" , "Oyun" , "Pategi" 
        ]
    } , 
    {
        name : "Abuja" , 
        province : [
            "Abaji" , "Abuja" , "Bwari" , "Gwagwalada" ,
            "Kwali"  
        ]
    } , 
    {
        name : "Kaduna" , 
        province : [
            "Birnin Gwari" , "Chikun" , "Giwa" , "Igabi" ,
            "Ikara" , "Jaba" , "Jema'a" ,  "Kachia" ,
            "Kaduna North" , "Kaduna South" , "Kagarko" , "Kajuru" ,				
            "Kaura" , "Kauru" , "Kubau" , "Kudan" , "Lere" ,
            "Makarf" , "Sabon Gari" , "Sanga" , "Soba" ,
            "Zangon Kataf" , "Zaria"  	
        ]
    } , 
    {
        name : "Kano" , 
        province : [
            "Ajingi" , "Albasu" ,  "Bagwai" , "Bebeji " , "Bichi" , 
            "Bunkure" , "Dala Kano " , "Dambatta " , "Dawakin Kudu" , 
            "Dawakin Tofa" , "Doguwa" , "Fagge" , "Gabasawa",  "Garko" ,  
            "Garun Mallam" , "Gaya", "Gezawa" , "Gwale" , "Gwarzo" , 
            "Kabo","Kano Municipal" , "Karaye" , "Kibiya" , "Kiru" , 
            "Kumbotso" , "Kunchi" , "Kura" ,"Madobi" , "Makoda" , 
            "Minjibir" , "Nasarawa ", "Rano" , "Rimin Gado" , "Rogo" , 
            "Shanono" , "Sumaila" , "Takai" , "Tarauni" , "Tofa", 
            "Tsanyawa" , "Tudun Wada" , "Ungogo" , "Warawa"  ,"Wudil" 
        ]
    } , 
    {
        name : "Taraba" , 
        province : [
            "Ardo Kola" , "Bali" , "Donga" , "Gashaka" , 
            "Gassol" , "Ibi" , "Jalingo" , "Karim Lamido" , 
            "Kurmi" , "Lau" , "Sardauna" , "Takum" , "Ussa" , 
            "Wukari" , "Yorro" , "Zing" 
        ] 
    } , 
    {
           name : "Nasarawa" , 
           province : [
            "Akwanga" , "Awe" , "Doma" , "Karu" , "Keana"  , 
            "Keffi" , "Kokona" , "Lafia" , "Nasarawa" , 
            "Nasarawa Egon" , "Obi" , "Toto" , 
            "Wamba"
        ]
    } , 
    {
        name : "Niger" , 
        province : [
            "Agaie" , "Agwara" , "Bida" , "Borgu" , "Bosso" , 
            "Chanchaga" , "Edati" , "Gbako" , "Gurara" , 
            "Katcha" , "Kontagora" , "Lapai" , "Lavun" , 
            "Magama" , "Mariga" , "Mashegu" , "Mokwa" , "Munya" , 
            "Paikoro" , "Rafi" , "Rijau" , "Shiroro" , "Suleja" , 
            "Tafa" , "Wushishi" 
        ] 
    } , 
    {
        name : "Adamawa" , 
        province : [
            "Demsa" , "Fufore" , "Ganye" , "Girei" , "Gombi" , 
            "Guyuk" , "Hong" , "Jada" , "Lamurde" , "Madagali" , 
            "Maiha" , "Mayo-Belwa" , "Michika" , "Mubi North" , 
            "Mubi South" , "Numan" , "Shelleng" , "Song" , "Toungo" , 
            "Yola North" , "Yola South" 
        ]
    } , 
    {
        name : "Cross River" , 
        province : [
            "Abi" , "Akamkpa" , "Akpabuyo" , "Bekwarra" , 
            "Bakassi" , "Biase" , "Boki" , "Calabar Municipal" ,
            "Calabar South" , "Etung" , "Ikom" , "Obanliku" , 
            "Obubra" , "Obudu" , "Odukpani" , "Ogoja" , 
            "Yakuur2"  , "Yala" 
        ]
    } , 
    {
        name : "Plateau" , 
        province : [
            "Barkin Ladi" , "Bassa" , "Bokkos" , "Jos East" , "Jos North" , 
            "Jos South" , "Kanam" , "Kanke" , "Langtang North" , "Langtang South" , 
            "Mangu" , "Mikang" , "Pankshin" , "Qua'an Pan" , "Riyom" , "Shendam"
        ]
    } , 
    {
        name : "Rivers" , 
        province: [
            "Abua-Odual" ,"Ahoada" , "Ahoada East" , "Ahoada West" , 
            "Aku" , "Akuku Toru" , "Andoni" , "Asari Toru" , "Bonny" , 
            "Degema" , "Eleme" , "Emohua" , "Etche" , "Gokana" , 
            "Ikwerre" , "Khana" , "Obio-Akpor" , "Ogba-Egbema-Ndoni" , 
            "Ogoni" , "Ogu-Bolo" , "Oguta" , "Ohaji-Egbema Ndoni" , 
            "Okrika" , "Opobo-Nkoro" , "Oyigbo" , "Port-Harcour" , "Tai"
        ] ,
    } , 
    {
        name : "Oyo" ,
        province : [ 
            "Afijio" , "Akinyele" , "Egbeda" , "Ibadan North" , 
            "Ibadan North-East"  , "Ibadan North-West" , "Ibadan South-West" , 
            "Ibadan South-East" , "Ibarapa Central" , "Ibarapa East" , 
            "Ido" , "Irepo" , "Iseyin" , "Kajola" , "Lagelu" , "Ogbomosho North" , 
            "Ogbomosho South" , "Oyo West" , "Atiba" , "Atisbo" , "Saki West" , 
            "Saki East" , "Itesiwaju" , "Iwajowa" , "Ibarapa North" , 
            "Olorunsogo" , "Oluyole" , "Ogo Oluwa" , "Surulere" , "Orelope" , 
            "Ori Ire" , "Oyo East" , "Ona Ara"
        ]
    }
] 

class ValidateRegistration {
    constructor () {
        this.inputs = Array.from(selectAll("input")).filter(e => e.id !== "course") 
        this.addEvent() 
    } 
    handleBlur(event){
        let target = event.target 
        let classList = target.classList 
        let nextSibling = target.nextElementSibling
        let parent = target.parentNode 
        let parentSibling = parent.nextElementSibling  
        let grandParent = parent.parentNode
        try { 
            switch(target.id){
                case "fullName" :
                    if (validateFullName(target.value.trim()).value !== null) {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                    }else {
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = target.nextElementSibling
                        msg.textContent = "Name should be only alphabets" 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.toggle("border-error-color") 
                        parent.insertBefore(msg ,  sibling)
                    }
                    break;
                case "userName" : 
                if (validateUserName(target.value.trim()).value !== null) {  
                    if(nextSibling.tagName === "P") nextSibling.remove() 
                        let msg = createElement("p") 
                        let div = createElement("div") 
                        let data = target.value 
                        div.className = "loader" 
                        let span = createElement("span") 
                        span.textContent = "Checking username availability..." 
                        span.className = "label"
                        msg.append(div , span) 
                        let sibling = target.nextElementSibling
                        parent.insertBefore(msg ,  sibling)
                        classList.toggle("border-moderate-color")
                        sendData("/check-username" , {data})
                        .then(res => {
                            console.log(res.message)
                            if (res.message){
                                msg.remove()
                                classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                                classList.remove("border-moderate-color")
                                classList.add("border-good-color")
                            }else {
                                msg.remove()
                                let m = createElement("p") 
                                m.className = "label" 
                                m.textContent = "Username taken"
                                let sibling = target.nextElementSibling
                                classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                                classList.add("border-moderate-color") 
                                parent.insertBefore(m ,  sibling)
                            }
                        }).catch(err => console.error(err))
                }else {
                    if(nextSibling.tagName === "P") nextSibling.remove() 
                    let msg = createElement("p") 
                    msg.className = "label"
                    let sibling = target.nextElementSibling
                    msg.textContent = "Username taken" 
                    classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                    classList.toggle("border-error-color") 
                    parent.insertBefore(msg ,  sibling)
                } 
                    break;
                case "email" : 
                if (validateEmail(target.value.trim()).value !== null) {
                    classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                    classList.add("border-good-color")
                    if(nextSibling.tagName === "P") nextSibling.remove() 
                }else {
                    if(nextSibling.tagName === "P") nextSibling.remove() 
                    let msg = createElement("p") 
                    msg.className = "label"
                    let sibling = target.nextElementSibling
                    msg.textContent = `${target.value} is not a valid email` 
                    classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                    classList.add("border-error-color") 
                    parent.insertBefore(msg ,  sibling)
                }
                   break;
                case "telephone" : 
                if (validateMobile(target.value.trim()).value !== null) {
                    classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                    classList.add("border-good-color")
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                }else {
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                    let msg = createElement("p") 
                    msg.className = "label"
                    let sibling = parent.nextElementSibling
                    msg.textContent = `${target.value} is not a valid mobile` 
                    classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                    classList.add("border-error-color") 
                    grandParent.insertBefore(msg ,  sibling)
                }
                   break;
                case "password" : 
                    if (validatePassword(target.value.trim()).value !== null) {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(parentSibling.tagName === "P") parentSibling.remove() 
                    }else {
                        if(parentSibling.tagName === "P") parentSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = parent.nextElementSibling
                        msg.textContent = `Password must be 8 characters and above` 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.add("border-error-color") 
                        grandParent.insertBefore(msg ,  sibling)
                    }
                   break;
                case "confirmPassword" : 
                if (target.value === selector("#password").value && target.value !== "") {
                    classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                    classList.add("border-good-color")
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                }else {
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                    let msg = createElement("p") 
                    msg.className = "label"
                    let sibling = parent.nextElementSibling
                    msg.textContent = `Password does not match` 
                    classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                    classList.add("border-error-color") 
                    grandParent.insertBefore(msg ,  sibling)
                }
                   break;
                default : 
                  throw new Error() 
            }
            
        }catch(error){
            const errorConfig = {
                name : error.name ,
                msg  : error.message
            }
            console.error(errorConfig)
        }
        
    } 
    handleClick(event){
        let target = event.target 
        let classList = target.classList
        if (classList.contains("revealPass")){ 
            let sibling = target.previousElementSibling
            sibling.type = sibling.type === "text" ? "password" : "text" 
            classList.toggle("fa-eye") 
            classList.toggle("fa-low-vision") 
        }
    }
    handleLoad(){
        window.addEventListener("load" , event => {
            if (selector("#residence")){
                let stateField = selector("#residence")  
                // stateField.classList.add("border-good-color")
                NigerianStates.sort((a , b) => a.name.localeCompare(b.name)).map(state => { 
                    let {name} = state
                    let option = createElement("option") 
                    option.value = name 
                    option.textContent = name 
                    stateField.append(option) 
                }) 
                let lgaField = selector("#lga") 
                NigerianStates.find(state => state.name === stateField.value).province.sort((a , b) => a.localeCompare(b))
                .map(province => {
                    let option = createElement("option") 
                    option.value = province
                    option.textContent = province 
                    lgaField.append(option)
                }) 
            }
        })
    }
    handleChange(event) { 
        let target = event.target 
        if (target.id === "residence"){
            target.value = target.value 
            let lgaField = selector("#lga") 
            lgaField.textContent = ""
            NigerianStates.find(state => state.name === target.value).province.sort((a , b) => a.localeCompare(b))
                .map(province => {
                    let option = createElement("option") 
                    option.value = province
                    option.textContent = province 
                    lgaField.append(option)
                }) 
        }
        
    }
    handleSubmit(event){ 
        event.preventDefault()
        if (event.target.type === "submit"){  
            let data = {}
            let controls = Array.from(selectAll(".validate"))
            if (controls.every(e => e.classList.contains("border-good-color"))){  
                controls.map(e => {
                    data[`${e.id}`] = e.value 
                })
                
                let sibling = event.target.nextElementSibling
                    sibling.textContent  = "" 
                    let msg = createElement("p")  
                    let div = createElement("div")
                    div.className = "loader" 
                    let span = createElement("span")
                    span.textContent = "...Processing"
                    span.className = "label"
                    sibling.append(div , span)  
                console.log(data)
                sendData("/register" , {data})
                .then(res => {
                    
                    let sibling = event.target.nextElementSibling 
                    sibling.textContent = res.message
                })
                .catch(err => {
                    console.error(err)
                })
            }else {
                let sibling = event.target.nextElementSibling 
                sibling.textContent  = ""
                let msg = createElement("p") 
                let div = createElement("div") 
                            
                div.className = "loader" 
                let span = createElement("span") 
                span.textContent = "You provided incorrect details , try again ..." 
                span.className = "label"
                sibling.append(div , span) 
            }
          
       }
        
    }
    addEvent(){
        this.inputs.map(input => {
            input.addEventListener("blur" , this.handleBlur)
            input.addEventListener("click" , this.handleSubmit) 
            input.addEventListener("change" , this.handleChange)
        })
        Array.from(selectAll("i.fa")).map(icon => icon.addEventListener("click" , this.handleClick)) 
        this.handleLoad() 
        if (selector("#residence"))selector("#residence").addEventListener("change" , this.handleChange)
    }
} 
new ValidateRegistration() 

