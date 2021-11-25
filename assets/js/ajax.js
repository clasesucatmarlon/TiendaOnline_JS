export function get(url, done, error){
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = function (){
    if (xhr.readyState != 4) {
      return;
    }

    if (xhr.status === 200) {
      done(xhr.responseText);
    } else {
      error({
          statusCode: xhr.status,
          statusText: xhr.statusText
        }
      );
    }
  }    
}
