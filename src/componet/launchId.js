import React, { useState, useEffect } from 'react';

function useLaunhId(id) {
  const [lid, setLid] = useState();

  useEffect(() => {
    fetch(`https://api.nike.com/launch/launch_views/v2/?filter=productId(${id})`)
      .then((res) => res.json())
      .then((json) => {
        setLid(json.objects[0].id);
      });
  });

  return lid;
}

export default useLaunhId;
