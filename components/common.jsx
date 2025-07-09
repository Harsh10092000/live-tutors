import moment from 'moment';

export const splitTags = (tags) => {
    return tags ? tags.split(',').map(tag => tag.trim()) : [];
}; 

export const formatTutoringTypeDisplayTitle = (type) => {
    if (!type) return '';
    // Split by either comma or pipe
    return type.split(/[,|]/)
      .map(t => {
        const trimmed = t.trim();
        if (trimmed === 'Online (using Zoom etc)') return 'Online';
        if (trimmed === 'At my place (home/institute)') return 'Home';
        if (trimmed === 'Travel to tutor') return 'Travel';
        return trimmed;
      })
      .join(' | ');
  };


  export const formatTutoringType = (type, travel_distance) => {
    if (!type) return '';
    // Split by either comma or pipe
    return type.split(/[,|]/)
      .map(t => {
        const trimmed = t.trim();
        if (trimmed === 'Online (using Zoom etc)') return 'Online Teaching';
        if (trimmed === 'At my place (home/institute)') return 'Home';
        if (trimmed === 'Travel to tutor') return `Student will Travel${travel_distance ? ` (Within ${travel_distance} km)` : ''}`;
        return trimmed;
      })
      .join(' | ');
  };

  // export const formatTutoringPreferencesArray  = (preferences, travel_distance) => {
  //   console.log("preferences : ", preferences);
  //   //const formattedPreferences = JSON.parse(preferences);
  //   const formattedPreferences = Array.isArray(preferences) ? preferences : JSON.parse(preferences);
  //   if (!preferences) return '';
  //   // return JSON.parse(preferences).map(pref => pref.trim());
  //   return formattedPreferences 
  //         .map(t => {
  //           const trimmed = t.trim();
  //           if (trimmed === 'Online (using Zoom etc)') return 'Online Teaching';
  //           if (trimmed === 'At my place (home/institute)') return 'Tutor\'s Place (Home or Institute)';
  //           if (trimmed === 'Travel to student') return `Tutor will Travel${travel_distance ? ` (Within ${travel_distance} km)` : ''}`;
  //           return trimmed;
  //         })
  //         .join(' | '); 
  // };

  export const formatTutoringPreferencesArray = (type, travel_distance) => {
    if (!type) return '';
    // Split by either comma or pipe
    return type.split(/[,|]/)
      .map(t => {
        const trimmed = t.trim();
        if (trimmed === 'Online (using Zoom etc)') return 'Online Teaching';
        if (trimmed === 'At my place (home/institute)') return 'Tutor\'s Place (Home or Institute)';
        if (trimmed === 'Travel to student') return `Tutor will Travel${travel_distance ? ` (Within ${travel_distance} km)` : ''}`;
        return trimmed;
      })
      .join(' | ');
  };


  export const formatLanguagePreferencesArray = (preferences) => {
    if (!preferences) return '';
    return JSON.parse(preferences).map(pref => pref.trim()).join(', ');
  };

  export const convertToSmallWord = (word) => {
    return word.toLowerCase();
  }

  export const formatDate = (date) => {
    return moment(date).fromNow();
  }


export const hiddenPhoneNumber = (phone) => {
    return (
        <>
            {phone.slice(0, 3)}
            <div style={{ display: 'inline-block', color: '#999999' }}>*******</div>
        </>
    );
}

  
export const hiddenEmail = (email) => {
  return (
    <>
        {email.slice(0, 3)}
        <div style={{ display: 'inline-block', color: '#999999' }}>****</div>@gmail.com
    </>
  );
}



// export default (phone) => {
//     if (!phone || typeof phone !== 'string' || phone.length < 10) {
//         return <span>Invalid phone number</span>;
//     }
//     return (
//         <>
//             {phone.slice(0, 3)}
//             <span style={{ color: '#999999' }}>*******</span>
//         </>
//     );
// };
  
//   export const HiddenEmail = (email) => {
//     if (!email || typeof email !== 'string' || !email.includes('@')) {
//       return <span>Invalid email</span>;
//     }
//     const [localPart, domain] = email.split('@');
//     return (
//       <>
//         {localPart.slice(0, 3)}
//         <span style={{ color: '#999999' }}>****</span>@{domain || 'gmail.com'}
//       </>
//     );
//   };
