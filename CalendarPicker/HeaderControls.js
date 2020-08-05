import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
import Controls from './Controls';

export default function HeaderControls(props) {
  const {
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    onPressMonth,
    onPressYear,
    months,
    previousComponent,
    nextComponent,
    previousTitle,
    nextTitle,
    previousTitleStyle,
    nextTitleStyle,
    shouldDisableNextMonth,
    shouldDisablePreviousMonth,
    disableMonthSelection,
    disableYearSelection,
    textStyle,
    restrictMonthNavigation,
    maxDate,
    minDate,
    headingLevel,
    monthYearHeaderWrapperStyle,
  } = props;
  const MONTHS = months || Utils.MONTHS; // English Month Array
  const monthName = MONTHS[currentMonth];
  const year = currentYear;

  let disablePreviousMonth = shouldDisablePreviousMonth || false
  disablePreviousMonth = disablePreviousMonth ? disablePreviousMonth : restrictMonthNavigation && Utils.isSameMonthAndYear(minDate, currentMonth, currentYear);

  let disableNextMonth = shouldDisableNextMonth || false
  disableNextMonth = disableNextMonth ? disableNextMonth : restrictMonthNavigation && Utils.isSameMonthAndYear(maxDate, currentMonth, currentYear);

  const accessibilityProps = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={styles.headerWrapper}>
      <Controls
        disabled={disablePreviousMonth}
        label={previousTitle}
        component={previousComponent}
        onPressControl={onPressPrevious}
        styles={styles.previousContainer}
        textStyles={[styles.navButtonText, textStyle, previousTitleStyle]}
      />
      <View style={[styles.monthYearHeaderWrapper,monthYearHeaderWrapperStyle]}>
        <TouchableOpacity disabled={disableYearSelection} onPress={onPressYear}>
          <Text style={[styles.yearHeaderMainText, textStyle]}>
            { year }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disableMonthSelection} onPress={onPressMonth}>
          <Text style={[styles.monthHeaderMainText, textStyle]} {...accessibilityProps}>
            { monthName }
          </Text>
        </TouchableOpacity>
      </View>
      <Controls
        disabled={disableNextMonth}
        label={nextTitle}
        component={nextComponent}
        onPressControl={onPressNext}
        styles={styles.nextContainer}
        textStyles={[styles.navButtonText, textStyle, nextTitleStyle]}
      />
    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  onPressMonth: PropTypes.func,
  onPressYear: PropTypes.func,
};
