import React, { useState, useEffect } from 'react';

function useLaunhId(id) {
  const [lid, setLid] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`https://api.nike.com/launch/launch_views/v2/?filter=productId(${id})`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.objects.length);
        if (json.objects.length > 0) {
          setLid(json.objects[0].id);
          setStatus(json.objects[0].launchState);
        }
      });
  });

  return { lid, status };
}

export default useLaunhId;
