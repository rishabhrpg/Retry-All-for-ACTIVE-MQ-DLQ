if (findActiveMq()) {
  console.info("Retry All Dead Letter Queue (Active MQ)");
  const loaderUrl = chrome.extension.getURL('loader.gif');
  if (findDLQHeading()) {
    findDLQHeading().innerHTML += "<a href='#' id='active_mq_retry_all_button' style='float:right'>Retry All</a>";
    findDLQHeading().innerHTML += "<img id='active_mq_retry_loader' style='float:right;display: none; width: 20px'>";
    document.getElementById('active_mq_retry_loader').src = loaderUrl;
    bindRetryAll();
  }
}

function findActiveMq() {
  return document.getElementById('activemq_logo');
}

function findDLQHeading() {
  return [...document.querySelectorAll('h2')].filter(h2 => h2.innerText.match('Browse DLQ'))[0];
}

function retryAll() {
  document.getElementById('active_mq_retry_all_button').style.display = 'none';
  document.getElementById('active_mq_retry_loader').style.display = 'block';
  const allPromises = [];
  [...document.querySelectorAll('a')].filter(a => a.innerText === 'Retry').forEach(anchor => {
    allPromises.push(fetch(anchor.href));
  });
  Promise.any(allPromises).then((meta) => {
    console.log('Done retry');
    location.reload();
  });
}

function bindRetryAll() {
  document.getElementById('active_mq_retry_all_button').addEventListener('click', retryAll);
}
