export function customSorting(a, b, flag, i = 0) {
  if (flag === 'alphabetical') {
    if (b[i] && !a[i]) {
      return -1;
    }
    if (!b[i] && a[i]) {
      return 1;
    }
    if (b[i] > a[i]) { return -1; }
    if (b[i] < a[i]) { return 1; }
    if (b[i] === a[i]) {
      if (b[i] && a[i]) {
        return customSorting(a, b, flag, i + 1);
      }
      return 0;
    }
  }
  return -1;
}

export function studyDetailSorting(a, b) {
  if (b && !a) {
    return -1;
  }
  if (!b && a) {
    return 1;
  }
  const aNumber = a.match(/(\d+)/) ? a.match(/(\d+)/)[0] : undefined;
  const bNumber = b.match(/(\d+)/) ? b.match(/(\d+)/)[0] : undefined;
  if (aNumber && bNumber) {
    if (parseInt(bNumber, 10) > parseInt(aNumber, 10)) {
      return -1;
    }
    if (parseInt(bNumber, 10) < parseInt(aNumber, 10)) {
      return 1;
    }
  }

  return customSorting(a, b, 'alphabetical', 0);
}

export function fromArmTOCohorDoes(cohorts, cohortDosing) {
  const cohortAndDosing = cohortDosing;
  let arrayDoes = [];
  const arrayCohortDes = [];
  // get cohort_does and cohort_description
  cohorts.forEach((cohort) => {
    // get cohort_does
    if (cohort.cohort_dose
              && cohort.cohort_dose !== ''
              && cohort.cohort_dose !== null) {
      arrayDoes.push(cohort.cohort_dose);
    }
    // get cohort_description
    if (cohort.cohort_description
              && cohort.cohort_description !== ''
                && cohort.cohort_description !== null) {
      arrayCohortDes.push(cohort.cohort_description);
    }
  });
  if (arrayDoes.length === 0) {
    if (arrayCohortDes.length === 0) {
      cohortAndDosing.does = '';
    } else {
      // replace cohort does with cohort desc
      arrayDoes = arrayCohortDes;
      cohortAndDosing.does = arrayDoes.sort((a, b) => studyDetailSorting(a, b)).join('#');
    }
  } else {
    cohortAndDosing.does = arrayDoes.sort((a, b) => studyDetailSorting(a, b)).join('#');
  }
  return cohortAndDosing;
}

/*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the file being displayed have already added to the cart.
    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
export function FileDisableRowSelection() {
  // if (cartData.length > 0) {
  //   if (cartData.includes(data.uuid)) {
  //     return false;
  //   }
  //   return true;
  // }
  return true;
}

/* on row select event
    @param  data  data for initial the table
    @param  allRowsSelected : selected rows
    @output [f.uuid]
*/

export function FileOnRowsSelect(data, allRowsSelected) {
  return allRowsSelected.map((row) => data[row.dataIndex].uuid);
}

export function isStudyUnderEmbargo(value) {
  const studyDisposition = 'under embargo';
  if (value === null || value === undefined) {
    return false;
  }
  return value.toLowerCase() === studyDisposition;
}
