/**
 * Filters input JSON data: retrieves entries with "drm" field set to true
 * and the number of episodes > 0
 * 
 * @param {JSON} data Input data, entries array are under the 'payload' key
 * 
 * @returns {JSON} Returns filtered entries.
 */
function drm_filter(data) {
  var filteredData = [];
  var response = {};
  var itemsArr = data['payload'];
  var epCount;

  if (itemsArr) {
    
    itemsArr.forEach(function(currItem, index, arr) {
      var item = {};

      epCount = currItem['episodeCount'];
      
      if ((currItem['drm'] && currItem['drm'] === true) && 
          // Check if the episode count is a number and positive
          ( epCount && !isNaN(parseInt(epCount)) && isFinite(epCount) && epCount > 0)) {
        item['image'] = currItem['image']['showImage'];
        item['slug'] = currItem['slug'];
        item['title'] = currItem['title'];

        // Add to response
        filteredData.push(item);
      }
    });
    
    response['response'] = filteredData;
  }
    
  return response;
}

module.exports = drm_filter;
