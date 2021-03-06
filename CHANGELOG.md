# Changelog

## 1.0.0
- Public functions for dynamic manipulation such as append and remove row(s)
- Client-side data support (without ajax calls)
- Row selecton (multi and single)
- Show/Hide column headers
- Improved formatters (former know as `data-custom="true"`)
- Added type converters per column (`data-converter="string|numeric|custom"`)
- Fixed multi sorting issue
- Added new events (selected, deselected, appended, removed, cleared, initialize, initialized)

### Breaking Changes
- `data-custom` is now `data-formatter` and instead of being a `bool` it is a event name

## 0.9.7
- Fixed a column header visualization bug regarding sorting

## 0.9.6
- CSS and HTML optimization for column headers
- Minor bug fix regarding status bar ("-1")

## 0.9.6-rc3
- Showing infos even if rowCount is -1 (all)

## 0.9.6-rc2
- Fixed a bug regarding rowCount
- Improved visualization generally

## 0.9.6-rc1
- Prevent click event on active pagination item
- Added refresh button
- Added selection box for selecting the row count
- Made the control more flexible

## 0.9.6-beta3
- Added a new default property (pagination) to disable the pagination

## 0.9.6-beta1
- Fixed a bug where "0" caused a rendering error
- Added bower.json file for bower support

## 0.9.5-alpha
- Fixed a regression bug which occurred when calling reload

## 0.9.4-alpha
- Improved loading mask

## 0.9.3-alpha
- Added loading mask
- Added new template syntax
- Fixed a bug where older browser showing {0} for each content row

## 0.9.2-alpha
- Added an new event for column customization